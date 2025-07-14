from rest_framework import serializers

# Import the CustomUser model
from django.contrib.auth import get_user_model

# For login functionality
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import check_password

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):  # This serializer automatically check for unique email and username based on the CustomUser model

    password = serializers.CharField(write_only=True, min_length=8) 

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'role']

    def create(self, validated_data):
        user = User.objects.create_user(    # Django built-in method to create a user with hashed password
            username=validated_data['username'], 
            email=validated_data['email'],
            password=validated_data['password'],
            role=validated_data.get('role', 'user')  # Default to 'user' if not provided
        )
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        username_or_email = attrs.get("username")
        password = attrs.get("password")

        # Try to find the user
        try:
            user = User.objects.get(username=username_or_email)
        except User.DoesNotExist:
            try:
                user = User.objects.get(email=username_or_email)
            except User.DoesNotExist:
                raise serializers.ValidationError("No user found with this username or email")

        # Check password manually
        if not user.check_password(password):
            raise serializers.ValidationError("Incorrect password")

        # Pass user to SimpleJWT's built-in flow
        data = super().validate({"username": user.username, "password": password})
        return data