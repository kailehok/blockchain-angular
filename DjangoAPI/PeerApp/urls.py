from django.conf.urls import url
from PeerApp import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[

    url(r'^peer/$',views.peerApi),
    url(r'^peer/([A-Za-z0-9]+)$',views.peerApi),
    url(r'^peerData/$',views.peerDataApi),
    url(r'^peerData/([A-Za-z0-9]+)$',views.peerDataApi),

] 