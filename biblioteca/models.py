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


# Third Model - Book (with FK to Author)
class Book(models.Model):
    title = models.CharField(max_length=200)
    isbn = models.CharField(max_length=13, unique=True)
    publication_date = models.DateField()
    pages = models.IntegerField()
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='books')  # Solo FK a Author
    
    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = "Book"
        verbose_name_plural = "Books"


# Fourth Model - Loan (With FK to Author and Book)
class Loan(models.Model):
    STATE_CHOICES = [
        ('ACTIVE', 'Active'),
        ('RETURNED', 'Returned'),
        ('OVERDUE', 'Overdue'),
    ]
    
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='loans')
    user = models.CharField(max_length=100)
    loan_date = models.DateField(auto_now_add=True)
    return_date = models.DateField()
    status = models.CharField(max_length=10, choices=STATE_CHOICES, default='ACTIVE')
    borrower_author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='loans')

    def __str__(self):
        return f"Loan of {self.book.title} to {self.user}"
    
    class Meta:
        verbose_name = "Loan"
        verbose_name_plural = "Loans"        