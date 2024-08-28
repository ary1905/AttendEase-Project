from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from .models import UserAccountNotice, UserAccount, StudentFacultySubjectTable, StudentAttendenceTable
from django.db.models import Max, Count, Sum

class GetFirstNameAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            first_name = request.user.first_name
            return Response({'first_name': first_name}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetEmailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            email = request.user.email
            return Response({'email': email}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class NoticesAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            notices = UserAccountNotice.objects.all()

            notice_data = [
                {
                    'notice_id': notice.id,
                    'notice_title': notice.title,
                    'notice_description': notice.description,
                }
                for notice in notices
            ]
            return Response(notice_data)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
class AddNoticeAPIView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data

        notice_title = data.get('notice_title')
        notice_desc = data.get('notice_desc')

        if not notice_title or not notice_desc:
            return Response({'error': 'Incomplete data provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            max_id = UserAccountNotice.objects.aggregate(Max('id'))['id__max'] or 0
            new_id = max_id + 1
            
            task = UserAccountNotice.objects.create(
                id=new_id,
                title=notice_title,
                description=notice_desc,
            )
            return Response({'success': 'Notice added successfully' + str(task)})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AddSubjectAPIView(APIView):
    def post(self, request):
        email = request.data.get('email')
        subject_selected = request.data.get('subject_selected')

        try:
            user = UserAccount.objects.get(email=email)
            if user.user_type == 'FC':
                if not user.subjects:
                    user.subjects = subject_selected
                else:
                    user.subjects += f",{subject_selected}"
                user.save()
                return Response({'message': 'Subject added successfully'}, status=status.HTTP_201_CREATED)
            else:
                return Response({'error': 'Only faculty accounts can add subjects'}, status=status.HTTP_403_FORBIDDEN)
        except UserAccount.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetSubjectsAPIView(APIView):
    def get(self, request):
        email = request.user.email
        try:
            user = UserAccount.objects.get(email=email)
            if user.subjects:
                subjects_list = user.subjects.split(',')
                subjects = [subject.strip() for subject in subjects_list]
                return Response({'subjects': subjects}, status=status.HTTP_200_OK)
            else:
                return Response({'subjects': []}, status=status.HTTP_200_OK)
        except UserAccount.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class StudentsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            subject = request.GET.get('subject')
            students = UserAccount.objects.all()

            if subject:
                student_ids_with_subject = StudentFacultySubjectTable.objects.filter(subject=subject).values_list('studentId', flat=True)
                students = students.exclude(facultyId__in=student_ids_with_subject)

            student_data = [
                {
                    'student_id': student.facultyId,
                    'student_first_name': student.first_name,
                    'student_last_name': student.last_name,
                    'user_type' : student.user_type,
                }
                for student in students
            ]
            return Response(student_data)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
        
class FacultyStudentAPIView(APIView):
    def post(self, request):
        student_ids = request.data.get('student_ids', [])
        subject_selected = request.data.get('subject_selected', '')
        faculty_id = request.user.facultyId

        for student_id in student_ids:
            StudentFacultySubjectTable.objects.create(
                facultyId=faculty_id,
                studentId=student_id,
                subject=subject_selected
            )

        return Response("Students added successfully", status=201)
    
    
class StudentAddedListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            subject = request.GET.get('subject')
            students = UserAccount.objects.all()

            if subject:
                student_ids_with_subject = StudentFacultySubjectTable.objects.filter(subject=subject).values_list('studentId', flat=True)
                students = students.filter(facultyId__in=student_ids_with_subject)

            student_data = [
                {
                    'student_id': student.facultyId,
                    'student_first_name': student.first_name,
                    'student_last_name': student.last_name,
                    'user_type' : student.user_type,
                }
                for student in students
            ]
            return Response(student_data)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class UpdateStudentAttendanceAPIView(APIView):
    def post(self, request):
        try:
            attendance_data = request.data.get('attendance', [])
            subject_selected = request.data.get('subject_selected', '')
            faculty_id = request.user.facultyId
            class_held_date = request.data.get('class_held_date', '')

            for data in attendance_data:
                student_id = data.get('student_id')
                checked = data.get('checked')
                attendance, created = StudentAttendenceTable.objects.get_or_create(
                    facultyId=faculty_id,
                    studentId=student_id,
                    subject=subject_selected,
                    class_held_date=class_held_date,
                    defaults={'present': checked}
                )
                if not created:
                    attendance.present = checked
                    attendance.save()

            return Response({'message': 'Attendance updated successfully'})
        except Exception as e:
            return Response({'error': str(e)}, status=400)
        


class GetStudentDailyAttendanceAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            faculty_id = request.user.facultyId
            student_data = []
            attendance_records = StudentAttendenceTable.objects.filter(studentId=faculty_id)
            for record in attendance_records:
                student_id = record.studentId

                student = UserAccount.objects.get(facultyId=student_id)
                student_name = f"{student.first_name} {student.last_name}"
                present = "Yes" if record.present else "No"
                date = record.class_held_date

                student_data.append({
                    'student_id': student_id,
                    'student_name': student_name,
                    'subject': record.subject,
                    'present': present,
                    'date' : date
                })
            return Response(student_data)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
class GetStudentTotalAttendanceAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            faculty_id = request.user.facultyId
            student_data = []
            unique_subjects = StudentAttendenceTable.objects.filter(studentId=faculty_id).values_list('subject', flat=True).distinct()        
            for subject in unique_subjects:
                student = UserAccount.objects.get(facultyId=faculty_id)
                student_name = f"{student.first_name} {student.last_name}"
                
                attendance_records = StudentAttendenceTable.objects.filter(studentId=faculty_id, subject=subject)
                total_entries = attendance_records.count()
                total_attended = attendance_records.filter(present=True).count()     

                student_data.append({
                    'student_id': faculty_id,
                    'student_name': student_name,
                    'subject': subject,
                    'total_class': total_entries,
                    'class_attend': total_attended,
                    'percent_attended': round((total_attended / total_entries) * 100, 2)
                })

            return Response(student_data)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
        
        