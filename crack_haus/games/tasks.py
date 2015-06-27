from huey import RedisHuey, crontab
from .models import Match

huey = RedisHuey('games', host='redis.crack.haus')

@huey.periodic_task(crontab(seconds='1'))
def purge():
    for match in Match.objects.filter(state='j'):
        match.purge()