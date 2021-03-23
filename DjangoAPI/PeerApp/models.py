from django.db import models

# Create your models here.

# Attributes for Peers 
class Peers(models.Model):

    PeerName = models.CharField(primary_key=True,max_length=100)
    Color = models.CharField(max_length=100)


# Attributes for PeerDatas
class PeerDatas(models.Model):
    PeerDataId = models.CharField(primary_key=True, max_length=100)
    Id = models.IntegerField()
    Peer = models.CharField(max_length=100)
    Data = models.CharField(max_length=100)
    TxHash = models.CharField(max_length=1000)
    UpdatedTxHash = models.CharField(max_length=1000)
    Deleted = models.BooleanField()
    Date = models.CharField(max_length=1000)