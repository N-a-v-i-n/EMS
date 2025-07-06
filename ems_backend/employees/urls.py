from django.urls import path
from .views import EmployeeListCreateView, EmployeeDeleteView, FieldDefinitionListCreateView, UpdateFieldPositionsView, EmployeeRetrieveUpdateView, FieldRetrieveUpdateDeleteView

urlpatterns = [
    path('', EmployeeListCreateView.as_view(), name='employee-list-create'),
    path("employees/<int:pk>/", EmployeeRetrieveUpdateView.as_view(), name="employee-detail-update"),
    path('<int:pk>/', EmployeeDeleteView.as_view(), name='employee-delete'),
    path('fields/', FieldDefinitionListCreateView.as_view(), name='field-definition-list-create'),
    path('fields/reorder/', UpdateFieldPositionsView.as_view(), name='field-reorder'),  # 👈 added
    path("fields/<int:pk>/", FieldRetrieveUpdateDeleteView.as_view(), name="field-rud"),



]
