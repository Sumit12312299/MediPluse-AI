from django.http import JsonResponse
from django.utils import timezone


def health_check(request):
    """
    Lightweight health check endpoint returning system operational status.
    """
    return JsonResponse(
        {
            "status": "healthy",
            "service": "MediPulse AI API Core",
            "version": "1.0.0",
            "timestamp": timezone.now().isoformat(),
            "environment": "production",
        },
        status=200,
    )
