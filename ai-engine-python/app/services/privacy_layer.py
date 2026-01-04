import re

class PrivacyPreserver:
    @staticmethod
    def anonymize(text: str) -> str:
        if not text:
            return ""
            
        # Email pattern
        email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
        text = re.sub(email_pattern, '[EMAIL_REDACTED]', text)
        
        # IBAN/RIB pattern (Simple regex)
        # Matches typical IBAN structure: 2 letters, 2 digits, then alphanumeric
        iban_pattern = r'\b[A-Z]{2}\d{2}[A-Z0-9]{1,30}\b'
        text = re.sub(iban_pattern, '[IBAN_REDACTED]', text)
        
        return text
