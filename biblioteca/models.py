from django.db import models

# First Model - Author
class Author(models.Model):
    name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    birth_date = models.DateField()
    nationality = models.CharField(max_length=50)
    
    def __str__(self):
        return f"{self.name} {self.last_name}"
    
    class Meta:
        verbose_name = "Author"
        verbose_name_plural = "Authors"