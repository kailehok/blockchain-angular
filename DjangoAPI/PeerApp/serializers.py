from rest_framework import serializers
from PeerApp.models import Peers,PeerDatas
class PeerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Peers
        fields = ('PeerName',
                    'Color')

class PeerDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = PeerDatas
        fields = ('PeerDataId',
                  'Id',
                  'Peer',
                  'Data',
                  'TxHash',
                  'UpdatedTxHash',
                  'Deleted',
                  'Date')