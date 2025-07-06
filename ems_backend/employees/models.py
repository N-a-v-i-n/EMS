from django.db import models

class EmployeeData(models.Model):
    data = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Employee {self.id}"

FIELD_TYPES = (
    ("text", "Text"),
    ("number", "Number"),
    ("date", "Date"),
    ("password", "Password"),
    ("email", "Email"),
    ("textarea", "Textarea"),
)

class FieldDefinition(models.Model):
    label = models.CharField(max_length=100)
    input_type = models.CharField(max_length=20, choices=FIELD_TYPES)
    required = models.BooleanField(default=True)
    position = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['position']

    def __str__(self):
        return self.label
