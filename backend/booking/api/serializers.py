from rest_framework import serializers

from booking.models import Booking


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ["uuid", "patient_name", "patient_email", "appointment_at", "flight_number", "flight_airline", "flight_origin"]

