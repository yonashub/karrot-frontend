from django.utils import timezone
from rest_framework import filters
from rest_framework import mixins
from rest_framework.decorators import detail_route
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle
from rest_framework.viewsets import GenericViewSet

from foodsaving.invitations.models import Invitation
from foodsaving.invitations.permissions import UserInGroup
from foodsaving.invitations.serializers import InvitationSerializer, InvitationAcceptSerializer


class InvitesPerDayThrottle(UserRateThrottle):
    rate = '50/day'


class InvitationsViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    GenericViewSet
):
    """
    Invitations
    """
    queryset = Invitation.objects
    serializer_class = InvitationSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('group', )
    permission_classes = (UserInGroup, )
    throttle_classes = ()

    def get_queryset(self):
        users_groups = self.request.user.groups.values('id')
        return self.queryset.filter(group__in=users_groups, expires_at__gte=timezone.now())

    def get_throttles(self):
        if self.action == 'create':
            self.throttle_classes = (InvitesPerDayThrottle, )
        return super().get_throttles()


class InvitationAcceptViewSet(GenericViewSet):
    queryset = Invitation.objects
    serializer_class = InvitationAcceptSerializer
    permission_classes = (IsAuthenticated,)
    lookup_field = 'token'

    def get_queryset(self):
        return self.queryset.filter(expires_at__gte=timezone.now())

    @detail_route(methods=['POST'])
    def accept(self, request, **kwargs):
        """
        Accept the invitation
        """
        self.check_object_permissions(request, request.user)
        instance = self.get_object()
        serializer = self.get_serializer(instance, request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


