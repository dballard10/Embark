from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr

from models.user import UserCreate, UserResponse
from dependencies import UserServiceDep
from middleware.error_handler import NotFoundException, BadRequestException

router = APIRouter()


class LoginRequest(BaseModel):
    """Request model for login"""
    email: EmailStr


class SignupRequest(BaseModel):
    """Request model for signup"""
    email: EmailStr
    username: str


@router.post("/login", response_model=UserResponse)
async def login(login_data: LoginRequest, service: UserServiceDep):
    """
    Login with email (no password required for MVP)
    
    - **email**: User's email address
    
    Returns the user data if found
    """
    try:
        user = await service.get_user_by_email(login_data.email)
        
        if not user:
            raise NotFoundException("User not found. Please sign up first.")
        
        return user
    except ValueError as e:
        raise BadRequestException(str(e))


@router.post("/signup", response_model=UserResponse, status_code=201)
async def signup(signup_data: SignupRequest, service: UserServiceDep):
    """
    Sign up a new user with email and username
    
    - **email**: User's email address (must be unique)
    - **username**: Desired username (must be unique, 3-50 characters)
    
    Returns the created user data
    """
    try:
        # Check if user already exists
        existing_user = await service.get_user_by_email(signup_data.email)
        if existing_user:
            raise BadRequestException("An account with this email already exists. Please login.")
        
        # Create new user
        user_data = UserCreate(
            email=signup_data.email,
            username=signup_data.username
        )
        return await service.create_user(user_data)
    except ValueError as e:
        raise BadRequestException(str(e))

