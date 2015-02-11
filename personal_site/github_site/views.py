from django.shortcuts import render_to_response
from django.template import RequestContext


def home (request):
	context = RequestContext(request)
	context_dict = {}

	return render_to_response('github_site/index.html', context_dict, context)