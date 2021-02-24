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
    if request.method=='GET':
        peers = Peers.objects.all()
        # departments = Departments.objects.filter(DepartmentName__endswith= name,DepartmentName__startswith = name)
        peers_serializer = PeerSerializer(peers,many = True)
        if peers_serializer:
            return JsonResponse(peers_serializer.data , safe=False)
        return JsonResponse("Failed to Display.",safe=False)
      

    elif request.method=='POST':
        peer_data=JSONParser().parse(request)
        peer_serializer = PeerSerializer(data=peer_data)
        if peer_serializer.is_valid():
            peer_serializer.save()
            return JsonResponse("Added Successfully!!" , safe=False)
        return JsonResponse("Failed to Add.",safe=False)
    
    elif request.method=='PUT':
        peer_data = JSONParser().parse(request)
        peer=Peers.objects.get(PeerName=peer_data['PeerName'])
        peer_serializer=PeerSerializer(peer,data=peer_data)
        if peer_serializer.is_valid():
            peer_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)

    elif request.method=='DELETE':
        peer=Peers.objects.get(PeerName=id)
        peer.delete()
        return JsonResponse("Deleted Successfully!!", safe=False)

@csrf_exempt
def peerDataApi(request,id=0):
    if request.method=='GET':
        # peerDatas = PeerDatas.objects.all()
        peerDatas = PeerDatas.objects.filter(PeerDataId__endswith = id,PeerDataId__startswith = id)
        peerDatas_serializer = PeerDataSerializer(peerDatas, many=True)
        return JsonResponse(peerDatas_serializer.data, safe=False)

    elif request.method=='POST':
        peerData_data=JSONParser().parse(request)
        peerData_serializer = PeerDataSerializer(data=peerData_data)
        if peerData_serializer.is_valid():
            peerData_serializer.save()
            return JsonResponse("Added Successfully!!" , safe=False)
        return JsonResponse("Failed to Add.",safe=False)
    
    elif request.method=='PUT':
        peerData_data = JSONParser().parse(request)
        peerData=PeerDatas.objects.get(PeerDataId=peerData_data['PeerDataId'])
        peerData_serializer=PeerDataSerializer(peerData,data=peerData_data)
        if peerData_serializer.is_valid():
            peerData_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)

    elif request.method=='DELETE':
        peerData=PeerDatas.objects.get(PeerDataId=id)
        peerData.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)


