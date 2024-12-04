provider "aws" {
  region = "us-east-1"
}

# Create VPC
resource "aws_vpc" "akashdeep_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags = {
    Name = "akashdeep-vpc"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "akashdeep_igw" {
  vpc_id = aws_vpc.akashdeep_vpc.id
  tags = {
    Name = "akashdeep-internet-gateway"
  }
}

# Public Subnets
resource "aws_subnet" "akashdeep_public_subnet_1" {
  vpc_id                  = aws_vpc.akashdeep_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true
  tags = {
    Name = "akashdeep-public-subnet-1"
  }
}

resource "aws_subnet" "akashdeep_public_subnet_2" {
  vpc_id                  = aws_vpc.akashdeep_vpc.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "us-east-1b"
  map_public_ip_on_launch = true
  tags = {
    Name = "akashdeep-public-subnet-2"
  }
}

# Private Subnets for Frontend
resource "aws_subnet" "akashdeep_private_frontend_subnet_1" {
  vpc_id            = aws_vpc.akashdeep_vpc.id
  cidr_block        = "10.0.3.0/24"
  availability_zone = "us-east-1a"
  tags = {
    Name = "akashdeep-private-frontend-subnet-1"
  }
}

resource "aws_subnet" "akashdeep_private_frontend_subnet_2" {
  vpc_id            = aws_vpc.akashdeep_vpc.id
  cidr_block        = "10.0.4.0/24"
  availability_zone = "us-east-1b"
  tags = {
    Name = "akashdeep-private-frontend-subnet-2"
  }
}

# Private Subnets for backend
resource "aws_subnet" "akashdeep_private_backend_subnet_1" {
  vpc_id            = aws_vpc.akashdeep_vpc.id
  cidr_block        = "10.0.3.0/24"
  availability_zone = "us-east-1a"
  tags = {
    Name = "akashdeep-private-backend-subnet-1"
  }
}

resource "aws_subnet" "akashdeep_private_backend_subnet_2" {
  vpc_id            = aws_vpc.akashdeep_vpc.id
  cidr_block        = "10.0.4.0/24"
  availability_zone = "us-east-1b"
  tags = {
    Name = "akashdeep-private-backend-subnet-2"
  }
}


# NAT Gateway for Private Subnets
resource "aws_eip" "akashdeep_nat_eip_1" {
  tags = {
    Name = "akashdeep-nat-eip-1"
  }
}

resource "aws_nat_gateway" "akashdeep_nat_gateway_1" {
  allocation_id = aws_eip.akashdeep_nat_eip_1.id
  subnet_id     = aws_subnet.akashdeep_public_subnet_1.id
  tags = {
    Name = "akashdeep-nat-gateway-1"
  }
}

resource "aws_eip" "akashdeep_nat_eip_2" {
  tags = {
    Name = "akashdeep-nat-eip-2"
  }
}

resource "aws_nat_gateway" "akashdeep_nat_gateway_2" {
  allocation_id = aws_eip.akashdeep_nat_eip_2.id
  subnet_id     = aws_subnet.akashdeep_public_subnet_2.id
  tags = {
    Name = "akashdeep-nat-gateway-2"
  }
}

# Route Tables for Public Subnets
resource "aws_route_table" "akashdeep_public_route_table" {
  vpc_id = aws_vpc.akashdeep_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.akashdeep_igw.id
  }
  tags = {
    Name = "akashdeep-public-route-table"
  }
}

resource "aws_route_table_association" "akashdeep_public_rta_1" {
  subnet_id      = aws_subnet.akashdeep_public_subnet_1.id
  route_table_id = aws_route_table.akashdeep_public_route_table.id
}

resource "aws_route_table_association" "akashdeep_public_rta_2" {
  subnet_id      = aws_subnet.akashdeep_public_subnet_2.id
  route_table_id = aws_route_table.akashdeep_public_route_table.id
}

# Route Tables for Private Subnets (Frontend)
resource "aws_route_table" "akashdeep_private_frontend_route_table" {
  vpc_id = aws_vpc.akashdeep_vpc.id
  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.akashdeep_nat_gateway_1.id
  }
  tags = {
    Name = "akashdeep-private-frontend-route-table"
  }
}

resource "aws_route_table_association" "akashdeep_private_frontend_rta_1" {
  subnet_id      = aws_subnet.akashdeep_private_frontend_subnet_1.id
  route_table_id = aws_route_table.akashdeep_private_frontend_route_table.id
}

resource "aws_route_table_association" "akashdeep_private_frontend_rta_2" {
  subnet_id      = aws_subnet.akashdeep_private_frontend_subnet_2.id
  route_table_id = aws_route_table.akashdeep_private_frontend_route_table.id
}

# Route Tables for Private Subnets (backend)
resource "aws_route_table" "akashdeep_private_backend_route_table" {
  vpc_id = aws_vpc.akashdeep_vpc.id
  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.akashdeep_nat_gateway_1.id
  }
  tags = {
    Name = "akashdeep-private-backend-route-table"
  }
}

resource "aws_route_table_association" "akashdeep_private_backend_rta_1" {
  subnet_id      = aws_subnet.akashdeep_private_backend_subnet_1.id
  route_table_id = aws_route_table.akashdeep_private_backend_route_table.id
}

resource "aws_route_table_association" "akashdeep_private_backend_rta_2" {
  subnet_id      = aws_subnet.akashdeep_private_backend_subnet_2.id
  route_table_id = aws_route_table.akashdeep_private_backend_route_table.id
}

# Security Group for ALB
resource "aws_security_group" "akashdeep_alb_backend_sg" {
  name        = "akashdeep-alb-backend-sg"
  description = "Allow traffic to ALB"
  vpc_id      = aws_vpc.akashdeep_vpc.id
  
  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}


# Security Group for ALB
resource "aws_security_group" "akashdeep_alb_frontend_sg" {
  name        = "akashdeep-alb-frontend-sg"
  description = "Allow traffic to ALB"
  vpc_id      = aws_vpc.akashdeep_vpc.id
  
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Security Group for ECS
resource "aws_security_group" "akashdeep_frontend_ecs_sg" {
  name        = "akashdeep-ecs-sg"
  description = "Allow traffic from ALB to ECS"
  vpc_id      = aws_vpc.akashdeep_vpc.id
  
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    security_groups = [aws_security_group.akashdeep_alb_sg.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# CloudWatch Log Group
resource "aws_cloudwatch_log_group" "akashdeep_log_group" {
  name               = "/ecs/akashdeep-log-group"
  retention_in_days  = 7  # Optional: Set retention period for logs
}

# Application Load Balancer
resource "aws_lb" "akashdeep_frontend_alb" {
  name               = "akashdeep-frontend-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.akashdeep_alb_sg.id]
  subnets            = [aws_subnet.akashdeep_public_subnet_1.id, aws_subnet.akashdeep_public_subnet_2.id]

  tags = {
    Name = "akashdeep-frontend-alb"
  }
}

# Target Group
resource "aws_lb_target_group" "akashdeep_frontend_target_group" {
  name        = "akashdeep-frontend-target-group"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = aws_vpc.akashdeep_vpc.id
  target_type = "ip"  # Set target type to IP for compatibility with Fargate

  health_check {
    enabled             = true
    interval            = 30
    path                = "/"
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
    matcher             = "200"
  }

  tags = {
    Name = "akashdeep-frontend-target-group"
  }
}

# Listener
resource "aws_lb_listener" "akashdeep_frontend_listener" {
  load_balancer_arn = aws_lb.akashdeep_frontend_alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.akashdeep_frontend_target_group.arn
  }
}

# IAM Role for ECS Task Execution
resource "aws_iam_role" "akashdeep_ecs_task_execution_role" {
  name = "akashdeep-ecs-task-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

# Attach Inline Policy Using aws_iam_role_policy
resource "aws_iam_role_policy" "akashdeep_ecs_task_execution_policy" {
  name = "ecs-task-execution-policy"
  role = aws_iam_role.akashdeep_ecs_task_execution_role.id

   policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = "ecr:GetAuthorizationToken"
        Effect   = "Allow"
        Resource = "*"
      },
      {
        Action   = "ecr:BatchGetImage"
        Effect   = "Allow"
        Resource = "*"
      },
      {
        Action   = "ecr:BatchCheckLayerAvailability"
        Effect   = "Allow"
        Resource = "*"
      },
      {
        Action   = "ecr:GetDownloadUrlForLayer"
        Effect   = "Allow"
        Resource = "*"
      },
      {
        Action   = "logs:*"
        Effect   = "Allow"
        Resource = "*"
      }
    ]
  })	
}


# ECS Cluster
resource "aws_ecs_cluster" "akashdeep_frontend_ecs_cluster" {
  name = "akashdeep-frontend-ecs-cluster"
}

resource "aws_ecs_task_definition" "akashdeep_task_definition" {
  family                   = "akashdeep-fargate-task"
  cpu                      = "256"
  memory                   = "512"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn       = aws_iam_role.akashdeep_ecs_task_execution_role.arn

  container_definitions = jsonencode([{
    name      = "restaurant-frontend-container"
    image     = "522814723398.dkr.ecr.us-east-1.amazonaws.com/restaurant-frontend-ecr:latest"
    cpu       = 256
    memory    = 512
    essential = true
    portMappings = [
      {
        containerPort = 80
        hostPort      = 80
      }
    ]
    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = aws_cloudwatch_log_group.akashdeep_log_group.name
        "awslogs-region"        = "us-east-1"
        "awslogs-stream-prefix" = "my-app-logs"
      }
    }
  }])
}


# ECS Service
resource "aws_ecs_service" "akashdeep_frontend_service" {
  name            = "akashdeep-fronten-service"
  cluster         = aws_ecs_cluster.akashdeep_frontend_ecs_cluster.id
  task_definition = aws_ecs_task_definition.akashdeep_task_definition.arn
  desired_count   = 2
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = [aws_subnet.akashdeep_private_frontend_subnet_1.id, aws_subnet.akashdeep_private_frontend_subnet_2.id]
    security_groups = [aws_security_group.akashdeep_frontend_ecs_sg.id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.akashdeep_frontend_target_group.arn
    container_name   = "restaurant-frontend-container"
    container_port   = 80
  }

  depends_on = [aws_lb_listener.akashdeep_frontend_listener]
}



# Security Group for ECS
resource "aws_security_group" "akashdeep_backend_ecs_sg" {
  name        = "akashdeep-ecs-sg"
  description = "Allow traffic from ALB to ECS"
  vpc_id      = aws_vpc.akashdeep_vpc.id
  
  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    security_groups = [aws_security_group.akashdeep_alb_backend_sg.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# CloudWatch Log Group
resource "aws_cloudwatch_log_group" "akashdeep_log_group_backend" {
  name               = "/ecs/akashdeep-log-group-backend"
  retention_in_days  = 7  # Optional: Set retention period for logs
}

# Application Load Balancer
resource "aws_lb" "akashdeep_backend_alb" {
  name               = "akashdeep-backend-alb"
  internal           = true
  load_balancer_type = "application"
  security_groups    = [aws_security_group.akashdeep_alb_backend_sg.id]
  subnets            = [aws_subnet.akashdeep_private_frontend_subnet_1.id, aws_subnet.akashdeep_private_frontend_subnet_2.id]

  tags = {
    Name = "akashdeep-backend-alb"
  }
}

# Target Group
resource "aws_lb_target_group" "akashdeep_backend_target_group" {
  name        = "akashdeep-backend-target-group"
  port        = 5000
  protocol    = "HTTP"
  vpc_id      = aws_vpc.akashdeep_vpc.id
  target_type = "ip"  # Set target type to IP for compatibility with Fargate

  health_check {
    enabled             = true
    interval            = 30
    path                = "/"
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
    matcher             = "200"
  }

  tags = {
    Name = "akashdeep-backend-target-group"
  }
}

# Listener
resource "aws_lb_listener" "akashdeep_backend_listener" {
  load_balancer_arn = aws_lb.akashdeep_backend_alb.arn
  port              = 5000
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.akashdeep_backend_target_group.arn
  }
}

# ECS Cluster
resource "aws_ecs_cluster" "akashdeep_backend_ecs_cluster" {
  name = "akashdeep-backend-ecs-cluster"
}

resource "aws_ecs_task_definition" "akashdeep_task_definition_backend" {
  family                   = "akashdeep-fargate-task"
  cpu                      = "256"
  memory                   = "512"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn       = aws_iam_role.akashdeep_ecs_task_execution_role.arn

  container_definitions = jsonencode([{
    name      = "restaurant-backend-container"
    image     = "522814723398.dkr.ecr.us-east-1.amazonaws.com/restaurant-backend-ecr:latest"
    cpu       = 256
    memory    = 512
    essential = true
    portMappings = [
      {
        containerPort = 5000
        hostPort      = 5000
      }
    ]
    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = aws_cloudwatch_log_group.akashdeep_log_group_backend.name
        "awslogs-region"        = "us-east-1"
        "awslogs-stream-prefix" = "my-app-logs"
      }
    }
  }])
}

# ECS Service
resource "aws_ecs_service" "akashdeep_backend_service" {
  name            = "akashdeep-backend-service"
  cluster         = aws_ecs_cluster.akashdeep_backend_ecs_cluster.id
  task_definition = aws_ecs_task_definition.akashdeep_task_definition.arn
  desired_count   = 2
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = [aws_subnet.akashdeep_private_backend_subnet_1.id, aws_subnet.akashdeep_private_backend_subnet_2.id]
    security_groups = [aws_security_group.akashdeep_backend_ecs_sg.id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.akashdeep_backend_target_group.arn
    container_name   = "restaurant-backend-container"
    container_port   = 5000
  }

  depends_on = [aws_lb_listener.akashdeep_backend_listener]
}



output "load_balancer_url" {
  value = aws_lb.akashdeep_frontend_alb.dns_name
}
