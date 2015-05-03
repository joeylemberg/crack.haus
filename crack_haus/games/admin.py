from django.contrib import admin
from .models import Game, Player, Match, Profile, Lobby

# Register your models here.
admin.site.register(Player)
admin.site.register(Game, admin.ModelAdmin)
admin.site.register(Match)
admin.site.register(Profile)
admin.site.register(Lobby)