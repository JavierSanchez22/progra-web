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


# Second Model - Editorial (with Fk to Author)
class Editorial(models.Model):
    name = models.CharField(max_length=100)
    address = models.TextField()
    phone = models.CharField(max_length=15)
    email = models.EmailField()
    founder = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='editorials')  # ForeignKey
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Editorial"
        verbose_name_plural = "Editorials"