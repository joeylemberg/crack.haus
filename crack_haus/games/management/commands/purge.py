import time

from django.core.management.base import BaseCommand, CommandError

from games.models import Match

class Command(BaseCommand):
    help = 'periodically purges matches and players'

    def handle(self, *args, **options):
        while True:
            for match in Match.objects.filter(state='j'):
                try:
                    match.purge()
                except Exception:
                    raise CommandError('something fucked up')
            time.sleep(1)