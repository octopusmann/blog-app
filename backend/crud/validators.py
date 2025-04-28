from django.core.exceptions import ValidationError

def validate_min_word_count(value):
    word_count = len(value.split())
    print(word_count)
    if word_count < 50:
        # raise ValidationError("Content must be at least 50 words")
        pass
        
def validate_max_word_count(value):
    word_count = len(value.split())
    if word_count > 1500:
        # raise ValidationError("Content must be not exceed 3000 words")
        pass