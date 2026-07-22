import os
import re

KNOWLEDGE_BASE = [
    {
        "title": "MediPulse Timings and General Contact Info",
        "content": "MediPulse Hospital is open 24/7 for emergency care. Outpatient consultations (OPD) are open Monday through Saturday from 09:00 AM to 05:00 PM. The main contact helpline is +91 98765 43210. Email: support@medipulse.ai."
    },
    {
        "title": "Doctor Specializations and Consultation Fees",
        "content": "Dr. Rajesh Sharma is a Senior Cardiologist (Department of Cardiovascular Sciences), fee: 800 INR, rating: 4.9. Dr. Ananya Gupta is a Neurologist (Department of Neurosciences), fee: 1200 INR, rating: 4.8. Dr. Vikram Malhotra is an Orthopedic Surgeon (Department of Orthopedics & Joint Care), fee: 950 INR, rating: 4.9. Dr. Priya Verma is a Dermatologist (Department of Dermatology), fee: 750 INR, rating: 4.7."
    },
    {
        "title": "Booking and Cancellation Policy",
        "content": "Appointments can be booked online via the patient dashboard. Cancellations or rescheduling can be done up to 2 hours before the scheduled time-slot. Payments made online for cancelled appointments are refunded to the original payment source within 3-5 working days."
    },
    {
        "title": "Symptom Advisory: High Blood Pressure (Hypertension)",
        "content": "Normal blood pressure is around 120/80 mmHg. A systolic reading above 130 or diastolic above 80 is considered elevated/hypertension. If you experience high blood pressure, reduce sodium intake, drink plenty of water, avoid caffeine, and contact a cardiologist. Seek immediate emergency care if you experience chest pain, shortness of breath, or sudden headache."
    },
    {
        "title": "Symptom Advisory: Tension Headaches & Muscle Strain",
        "content": "For neck muscle strains and tension headaches, take rest, apply cold/warm compress, and perform gentle neck stretches. Over-the-counter pain relievers like Naproxen 500mg can help (always consult Dr. Ananya Gupta or a physician first). Avoid continuous screen time and maintain good posture."
    },
    {
        "title": "Digital Prescriptions and AI Summaries",
        "content": "Digital prescriptions with automatic AI-generated summaries are published in the Patient Dashboard immediately after consultation. You can view, download, or listen to the audio transcript summary directly from the dashboard."
    },
    {
        "title": "Online Payments and Security",
        "content": "MediPulse-AI supports secure online payments via UPI (GPay, PhonePe, Paytm) and Credit/Debit cards. Transaction history, receipts, and status can be tracked in the Billing & Payments section of the dashboard."
    }
]

def search_knowledge_base(query, top_k=2):
    """Simple term-frequency overlap keyword matching for local fallback retrieval"""
    query_words = set(re.findall(r'\w+', query.lower()))
    matches = []
    for chunk in KNOWLEDGE_BASE:
        chunk_words = re.findall(r'\w+', (chunk["title"] + " " + chunk["content"]).lower())
        overlap = len(query_words.intersection(set(chunk_words)))
        matches.append((chunk, overlap))
    
    # Sort by overlap count
    matches.sort(key=lambda x: x[1], reverse=True)
    return [item[0] for item in matches[:top_k]]

def generate_rag_response(query):
    # Retrieve context
    relevant_chunks = search_knowledge_base(query)
    context = "\n\n".join([f"Source: {c['title']}\n{c['content']}" for c in relevant_chunks])
    
    gemini_key = os.environ.get('GEMINI_API_KEY')
    if gemini_key:
        try:
            import google.generativeai as genai
            genai.configure(api_key=gemini_key)
            model = genai.GenerativeModel('gemini-1.5-flash')
            system_prompt = (
                "You are the MediPulse-AI Clinical Assistant. Answer the user's question using the provided context. "
                "If the context does not contain the answer, use your medical knowledge to guide the user but mention the context limit. "
                f"Context:\n{context}"
            )
            response = model.generate_content(f"{system_prompt}\n\nUser Question: {query}")
            return {
                "answer": response.text.strip(),
                "context": [c["title"] for c in relevant_chunks],
                "powered_by": "Gemini AI"
            }
        except Exception as e:
            print(f"Gemini RAG fallback: {e}")
            
    # Intelligent fall-back generation
    best_match = relevant_chunks[0]
    # Simple rule-based template replies
    answer = (
        f"Based on our hospital guidelines and resources (Reference: {best_match['title']}):\n\n"
        f"{best_match['content']}\n\n"
        "If you need more specific clinical advice, please schedule a virtual teleconsultation with our specialists via the Patient Dashboard."
    )
    return {
        "answer": answer,
        "context": [c["title"] for c in relevant_chunks],
        "powered_by": "Local Semantic Matching"
    }
