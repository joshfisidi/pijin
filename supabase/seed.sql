-- Seed data for development environment only
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
VALUES 
    ('d0d4fece-8a9f-4868-b9b6-1c5c7c1d8f9a', 'test@example.com', 
    crypt('password123', gen_salt('bf')), 
    now(),
    '{"full_name": "Test User", "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=test"}'::jsonb
    )
ON CONFLICT DO NOTHING;

-- Insert profiles (trigger will handle this automatically for real users)
INSERT INTO public.profiles (id, username, full_name, avatar_url, website)
VALUES
    ('d0d4fece-8a9f-4868-b9b6-1c5c7c1d8f9a', 'testuser', 'Test User', 
    'https://api.dicebear.com/7.x/avataaars/svg?seed=test', 'https://example.com')
ON CONFLICT DO NOTHING; 