from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response


class ListQuestions(APIView):

    def get(self, request):
        question_one = {
            'id': 1,
            'description': 'Order the following countries from largest to smallest in population.',
            'options': [
                {'id': 1,'answer_id': 1, 'text': 'United States of America', 'question_id': 1},
                {'id': 2,'answer_id': 2, 'text': 'Canada', 'question_id': 1},
                {'id': 3,'answer_id': 3, 'text': 'Mexico', 'question_id': 1},
                {'id': 4,'answer_id': 4, 'text': 'England', 'question_id': 1},
                {'id': 5,'answer_id': 5, 'text': 'Japan', 'question_id': 1},
            ]
        }
        question_two = {'id': 2,
            'description': 'Order the following U.S. Presidents in chronological order.',
            'options': [
                {'id': 6,'answer_id': 6, 'text': 'Ronald Reagan', 'question_id': 2},
                {'id': 7,'answer_id': 7, 'text': 'Richard Nixon', 'question_id': 2},
                {'id': 8,'answer_id': 8, 'text': 'Barack Obama', 'question_id': 2},
                {'id': 9,'answer_id': 9, 'text': 'Theodore Roosevelt', 'question_id': 2},
                {'id': 10,'answer_id': 10, 'text': 'Andrew Jackson', 'question_id': 2},
            ]
        }
        data = [question_one, question_two]
        return Response(
            status=status.HTTP_200_OK,
            data=data,
        )
