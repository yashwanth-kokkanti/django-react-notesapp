from sys import api_version
from django.shortcuts import render

from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view

import api
from . models import Note
from . serializers import NoteSerializer
# Create your views here.

@api_view(['GET'])
def getRoute(request):
    routes = [{'One': 1, 'two':2}]
    return Response(routes) ## safe = False sets Jsonreponse to return any type of data

@api_view(['GET'])
def getNotes(request):
    #notes = [{'note1': 1, 'note2':2}]
    notes = Note.objects.all().order_by('-updated')
    serializer = NoteSerializer(notes, many=True)
    return Response (serializer.data)

@api_view(['GET'])
def getNote(request, pk):
    #notes = [{'note1': 1, 'note2':2}]
    notes = Note.objects.get(id=pk)
    serializer = NoteSerializer(notes, many=False)
    return Response (serializer.data)

@api_view(['POST'])
def createNote(request):
    data = request.data
    note = Note.objects.create(
        body=data['body']
    )
    serializer = NoteSerializer(note, many=False)

    return Response(serializer.data)

@api_view(['PUT'])
def updateNote(request, pk):
    data = request.data
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(instance=note, data=data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteNote(request, pk):

    note = Note.objects.get(id=pk)
    note.delete()
    return Response('Note was deleted')