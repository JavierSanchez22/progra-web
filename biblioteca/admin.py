from django.contrib import admin
from .models import Author
from .models import Editorial

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