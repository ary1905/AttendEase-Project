from django.urls import path
from .views import GetFirstNameAPIView, GetEmailAPIView, NoticesAPIView, AddNoticeAPIView, AddSubjectAPIView
from .views import GetSubjectsAPIView, StudentsAPIView, FacultyStudentAPIView, StudentAddedListAPIView, UpdateStudentAttendanceAPIView
from .views import GetStudentDailyAttendanceAPIView, GetStudentTotalAttendanceAPIView

urlpatterns = [
    path('api/get_first_name/', GetFirstNameAPIView.as_view(), name='get_first_name'),
    path('api/get_email/', GetEmailAPIView.as_view(), name='get_email'),
    path('api/get_notices/', NoticesAPIView.as_view(), name='get_notices'),
    path('api/get_subjects/', GetSubjectsAPIView.as_view(), name='get_subjects'),
    path('api/get_students/', StudentsAPIView.as_view(), name='get_students'),
    path('api/add_notice/', AddNoticeAPIView.as_view(), name='add_notice'),
    path('api/add_subject/', AddSubjectAPIView.as_view(), name='add_subject'),
    path('api/add_faculty_student/', FacultyStudentAPIView.as_view(), name='add_faculty_student'),
    path('api/get_added_student_list/', StudentAddedListAPIView.as_view(), name='get_added_student_list'),
    path('api/update_student_attendace/', UpdateStudentAttendanceAPIView.as_view(), name='update_student_attendace'),
    path('api/get_student_daily_report/', GetStudentDailyAttendanceAPIView.as_view(), name='get_student_daily_report'),
    path('api/get_student_total_report/', GetStudentTotalAttendanceAPIView.as_view(), name='get_student_total_report'),
]
