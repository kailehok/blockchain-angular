from django.db import models

# Create your models here.
class Peers(models.Model):

    PeerName = models.CharField(primary_key=True,max_length=100)
    Color = models.CharField(max_length=100)

class PeerDatas(models.Model):
    PeerDataId = models.CharField(primary_key=True, max_length=100)
    Id = models.IntegerField()
    Peer = models.CharField(max_length=100)
    Data = models.CharField(max_length=100)
    TxHash = models.CharField(max_length=100)
    UpdatedTxHash = models.CharField(max_length=100)
    Deleted = models.BooleanField()