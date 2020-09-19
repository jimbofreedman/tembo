import io
from django.db import models
import uuid
from django.dispatch import receiver
from django.db.models import signals
from anymail.message import attach_inline_image
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
import qrcode
from qrcode.image.pure import PymagingImage

# Create your models here.
class Booking(models.Model):
    uuid = models.UUIDField(default = uuid.uuid4)
    patient_name = models.CharField(max_length=128)
    appointment_at = models.DateTimeField()
    patient_email = models.CharField(max_length=128)
    flight_number = models.CharField(max_length=8)
    flight_airline = models.CharField(max_length=64)
    flight_origin = models.CharField(max_length=64)

@receiver(signals.post_save, sender=Booking, dispatch_uid="send_conf_email")
def on_booking_create(sender, instance, created, *args, **kwargs):
    """Argument explanation:

       sender - The model class. (MyModel)
       instance - The actual instance being saved.
       created - Boolean; True if a new record was created.

       *args, **kwargs - Capture the unneeded `raw` and `using`(1.3) arguments.
    """
    if created:
        merge_data = {
            'PATIENT_NAME': instance.patient_name,
            'PATIENT_EMAIL': instance.patient_email,
            'APPOINTMENT_AT': instance.appointment_at,
            'FLIGHT_NUMBER': instance.flight_number,
            'FLIGHT_AIRLINE': instance.flight_airline,
            'FLIGHT_ORIGIN': instance.flight_origin,
        }

        qr = qrcode.QRCode(
            version=None,
            image_factory=PymagingImage,
            box_size=20,
            border=4
        )
        qr.add_data(instance.uuid)
        image = qr.make_image(fit=True)
        image_bytes = io.BytesIO()
        image.save(image_bytes)

        subject = render_to_string("booking/conf_subject.txt", merge_data).strip()
        text_body = render_to_string("booking/conf_body.txt", merge_data)
        message = EmailMultiAlternatives(subject=subject, from_email="no-reply@cerdio.com",
                                     to=[instance.patient_email], body=text_body)
        merge_data["CID"] = attach_inline_image(message, image_bytes.getvalue(), "qr.png")
        html_body = render_to_string("booking/conf_body.html", merge_data)
        message.attach_alternative(html_body, "text/html")
        message.send()

