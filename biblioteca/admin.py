from django.contrib import admin
from .models import Author
from .models import Editorial
from .models import Book
from .models import Loan

@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ['name', 'last_name', 'nationality', 'birth_date']
    list_filter = ['nationality', 'birth_date']
    search_fields = ['name', 'last_name']

@admin.register(Editorial)
class EditorialAdmin(admin.ModelAdmin):
    list_display = ['name', 'founder', 'phone', 'email']
    list_filter = ['founder']
    search_fields = ['name']
    ordering = ['name']
    autocomplete_fields = ['founder']

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'publication_date', 'pages'] 
    list_filter = ['author', 'publication_date'] 
    search_fields = ['title', 'isbn']
    ordering = ['title']
    autocomplete_fields = ['author'] 

@admin.register(Loan)
class LoanAdmin(admin.ModelAdmin):
    list_display = ['book', 'borrower_author', 'user', 'loan_date', 'return_date', 'status'] 
    list_filter = ['status', 'borrower_author', 'loan_date', 'return_date']  
    search_fields = ['user', 'book__title']
    ordering = ['-loan_date']
    autocomplete_fields = ['book', 'borrower_author']  