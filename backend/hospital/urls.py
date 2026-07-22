from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    # JWT Auth
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    
    # Doctors & Patients
    path('doctors/', views.doctors_list, name='doctors_list'),
    path('patients/', views.patients_list, name='patients_list'),
    
    # Appointments
    path('appointments/', views.appointments_api, name='appointments_api'),
    path('appointments/<int:pk>/', views.appointments_api, name='appointment_detail'),
    
    # Prescriptions & AI Summary
    path('prescriptions/', views.prescriptions_api, name='prescriptions_api'),
    path('prescriptions/ai-summarize/', views.ai_summarize_raw_prescription, name='ai_summarize'),
    
    # Payments & Gateway
    path('payments/', views.payments_api, name='payments_api'),
    
    # Notifications & Logs
    path('notifications/', views.notifications_api, name='notifications_api'),
    
    # Admin Metrics
    path('admin/metrics/', views.admin_metrics, name='admin_metrics'),
    
    # RAG Chat Endpoint
    path('rag-chat/', views.rag_chat_api, name='rag_chat'),
]
