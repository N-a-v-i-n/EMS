from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import EmployeeData, FieldDefinition
from .serializers import EmployeeDataSerializer, FieldDefinitionSerializer

class EmployeeListCreateView(generics.ListCreateAPIView):
    queryset = EmployeeData.objects.all().order_by('-id')
    serializer_class = EmployeeDataSerializer
    permission_classes = [permissions.IsAuthenticated]

class EmployeeRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    queryset = EmployeeData.objects.all()
    serializer_class = EmployeeDataSerializer
    permission_classes = [permissions.IsAuthenticated]


class EmployeeDeleteView(generics.DestroyAPIView):
    queryset = EmployeeData.objects.all()
    serializer_class = EmployeeDataSerializer
    permission_classes = [permissions.IsAuthenticated]

class FieldDefinitionListCreateView(generics.ListCreateAPIView):
    queryset = FieldDefinition.objects.all().order_by('position')  # 👈 changed here
    serializer_class = FieldDefinitionSerializer
    permission_classes = [permissions.IsAuthenticated]

class FieldRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FieldDefinition.objects.all()
    serializer_class = FieldDefinitionSerializer
    permission_classes = [permissions.IsAuthenticated]


class UpdateFieldPositionsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        """
        Expects: [{ "id": 3, "position": 0 }, { "id": 1, "position": 1 }]
        """
        for item in request.data:
            try:
                field = FieldDefinition.objects.get(id=item['id'])
                field.position = item['position']
                field.save()
            except FieldDefinition.DoesNotExist:
                continue
        return Response({"message": "Field positions updated"}, status=status.HTTP_200_OK)

