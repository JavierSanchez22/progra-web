from django.contrib import admin
from .models import Author

@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ['name', 'last_name', 'nationality', 'birth_date']
    list_filter = ['nationality', 'birth_date']
    search_fields = ['name', 'last_name']
