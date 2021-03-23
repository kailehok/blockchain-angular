from django.conf.urls import url
from PeerApp import views

from django.conf.urls.static import static
from django.conf import settings


# Configuring urlpatterns to hit the views in views.py accordingly
urlpatterns=[

    url(r'^peer/$',views.peerApi),
    url(r'^peer/([A-Za-z0-9]+)$',views.peerApi),
    url(r'^peerData/$',views.peerDataApi),
    url(r'^peerData/([A-Za-z0-9]+)$',views.peerDataApi),

] 