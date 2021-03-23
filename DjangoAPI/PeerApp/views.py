from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from PeerApp.models import Peers,PeerDatas
from PeerApp.serializers import PeerDataSerializer,PeerSerializer

from django.core.files.storage import default_storage


# Create your views here.

@csrf_exempt
def peerApi(request,id=0,name=0):
    # Providing the list of all peer names
    if request.method=='GET':
        peers = Peers.objects.all()
        peers_serializer = PeerSerializer(peers,many = True)
        if peers_serializer:
            return JsonResponse(peers_serializer.data , safe=False)
        return JsonResponse("Failed to Display.",safe=False)
      
    # Posting a new peer name to the database
    elif request.method=='POST':
        peer_data=JSONParser().parse(request)
        peer_serializer = PeerSerializer(data=peer_data)
        if peer_serializer.is_valid():
            peer_serializer.save()
            return JsonResponse("Added Successfully!!" , safe=False)
        return JsonResponse("Failed to Add.",safe=False)
    
    # Editing an existing peer name to the database
    elif request.method=='PUT':
        peer_data = JSONParser().parse(request)
        peer=Peers.objects.get(PeerName=peer_data['PeerName'])
        peer_serializer=PeerSerializer(peer,data=peer_data)
        if peer_serializer.is_valid():
            peer_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)

    # Deleting a peer from the database
    elif request.method=='DELETE':
        peer=Peers.objects.get(PeerName=id)
        peer.delete()
        return JsonResponse("Deleted Successfully!!", safe=False)

@csrf_exempt
def peerDataApi(request,id=0):
    # Providing the list of blocks for a peer that matches the id
    if request.method=='GET':
        # peerDatas = PeerDatas.objects.all()
        peerDatas = PeerDatas.objects.filter(PeerDataId__endswith = id,PeerDataId__startswith = id)
        peerData = peerDatas.order_by('Id')

        peerDatas_serializer = PeerDataSerializer(peerData, many=True)
        return JsonResponse(peerDatas_serializer.data, safe=False)

    # Posting a new block
    elif request.method=='POST':
        peerData_data=JSONParser().parse(request)
        peerData_serializer = PeerDataSerializer(data=peerData_data)
        if peerData_serializer.is_valid():
            peerData_serializer.save()
            return JsonResponse("Added Successfully!!" , safe=False)
        return JsonResponse("Failed to Add.",safe=False)
    
    # Editing an existing block
    elif request.method=='PUT':
        peerData_data = JSONParser().parse(request)
        peerData=PeerDatas.objects.get(PeerDataId=peerData_data['PeerDataId'])
        peerData_serializer=PeerDataSerializer(peerData,data=peerData_data)
        if peerData_serializer.is_valid():
            peerData_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)

     # Deleting a block
    elif request.method=='DELETE':
        peerData=PeerDatas.objects.get(PeerDataId=id)
        peerData.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)


