from django.http import JsonResponse
from django.utils import timezone


def health_check(request):
    """
    Lightweight health check endpoint returning system operational status.
    """
    return JsonResponse(
        {
            # Indicates overall operational readiness.
            "status": "healthy",
            # Name identifier of current core service.
            "service": "MediPulse AI API Core",
            # Version details mapping active build.
            "version": "1.0.0",
            # ISO timestamp of when the status checks ran.
            "timestamp": timezone.now().isoformat(),
            # Current operational deployment environment mode.
            "environment": "production",
        },
        status=200,
    )
