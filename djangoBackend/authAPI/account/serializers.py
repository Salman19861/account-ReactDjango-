from .models import MyUser
from rest_framework import serializers
from django.utils import encoding 
from django.utils import http  
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from account.utils import Utils


class UserRegistrationSerializer(serializers.ModelSerializer):
    password2=serializers.CharField(style={'input_type':'password'},write_only=True)
    class Meta: 
        model=MyUser 
        fields=['email','name','password','password2','tc']
        extra_kwargs={'write_only':True}
    def validate(self, data):
        password=data.get('password')
        password2=data.get('password2')
        if password!=password2:raise serializers.ValidationError("Password and Confirm Password doesn't matched")
        return data
    def create(self, validated_data):
        return MyUser.objects.create_user(**validated_data)

class UserLoginSerializer(serializers.ModelSerializer):
    email=serializers.EmailField(max_length=255)
    class Meta:
        model=MyUser
        fields=['email','password']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=MyUser
        fields=['id','email','name']

class UserChangePasswordSerializer(serializers.Serializer):
    password=serializers.CharField(max_length=255,style={'input-type':'password'},write_only=True)
    password2=serializers.CharField(max_length=255,style={'input-type':'password'},write_only=True)
    class Meta:
        fields=['password','password2']
    def validate(self,data):
        password=data.get('password')
        password2=data.get('password2')
        user=self.context.get('user')
        if password!=password2:raise serializers.ValidationError("Password and Confirm Password doesn't matched")
        user.set_password(password)
        user.save()
        return data
            
class SendPasswordResetEmailSerializer(serializers.Serializer):
    email=serializers.CharField(max_length=255)
    class Meta:
        fields=['email']
    def validate(self, attrs):
        email=attrs.get('email')
        if MyUser.objects.filter(email=email).exists():
            user=MyUser.objects.get(email=email)
            uid=http.urlsafe_base64_encode(encoding.force_bytes(user.id))
            token=PasswordResetTokenGenerator().make_token(user)
            link="http://localhost:3000/api/user/reset/"+uid+'/'+token
            print(link)
            data={
                "subject":"Reset Your Password",
                "body":f"{user.name}, Click the following link to reset Your Password: {link}",
                "to_email":user.email
            }
            # Utils.send_mail(data)
            
            return attrs

        else:
            raise serializers.ValidationError('Your are not a Registered User')

class UserPasswordResetSerializer(serializers.Serializer):
    password=serializers.CharField(max_length=255,style={'input-type':'password'},write_only=True)
    password2=serializers.CharField(max_length=255,style={'input-type':'password'},write_only=True)
    class Meta:
        fields=['password','password2']
    def validate(self,data):
        # try:
        password=data.get('password')
        password2=data.get('password2')
        uid=self.context.get('uid')
        token=self.context.get('token')
        if password!=password2:raise serializers.ValidationError("Password and Confirm Password doesn't matched")
        id=encoding.smart_str(http.urlsafe_base64_decode(uid))
        user=MyUser.objects.get(id=id)
        if not PasswordResetTokenGenerator().check_token(user,token):
            raise serializers.ValidationError("Token is not Valid or Expired")
        # print(type(password))
        user.set_password(password)
        user.save()
        return data
        # except DjangoUnicodeDecodeError as identifier:
        #     PasswordResetTokenGenerator().check_token(user,token)
        #     raise serializers.ValidationError("Token is not Valid or Expired")

