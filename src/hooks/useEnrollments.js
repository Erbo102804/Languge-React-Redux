import { useSelector } from 'react-redux'
import { selectUserEnrollments, selectIsEnrolled } from '../redux/slices/enrollmentsSlice'

export const useMyEnrollments = (userId) => useSelector(selectUserEnrollments(userId))
export const useIsEnrolled = (userId, courseId) => useSelector(selectIsEnrolled(userId, courseId))
