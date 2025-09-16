"""
InteGrow Backend - FastAPI Application

This is the main entry point for the InteGrow backend API.
It handles AI-powered growth planning and business intelligence.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config.settings import settings
from app.api import router as api_router

# Create FastAPI instance
app = FastAPI(
    title="InteGrow API",
    description="AI-powered business growth and intelligence platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(api_router, prefix="/api/v1")


@app.get("/")
async def root():
    """Root endpoint - health check"""
    return JSONResponse(
        content={
            "message": "InteGrow API is running",
            "version": "1.0.0",
            "status": "healthy"
        }
    )


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return JSONResponse(
        content={
            "status": "healthy",
            "service": "integrow-backend",
            "version": "1.0.0"
        }
    )


if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
        log_level="info" if not settings.DEBUG else "debug"
    )