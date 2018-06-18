from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.ListQuestions.as_view(), name='questions'),
]
