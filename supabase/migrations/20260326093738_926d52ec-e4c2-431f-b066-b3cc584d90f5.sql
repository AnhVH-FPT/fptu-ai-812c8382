
-- 1. Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'faculty');

-- 2. Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. Security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 4. RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 5. Faculty profiles table
CREATE TABLE public.faculty_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  title_vi TEXT NOT NULL DEFAULT '',
  title_en TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  bio_vi TEXT NOT NULL DEFAULT '',
  bio_en TEXT NOT NULL DEFAULT '',
  research_areas_vi TEXT[] NOT NULL DEFAULT '{}',
  research_areas_en TEXT[] NOT NULL DEFAULT '{}',
  courses_vi TEXT[] NOT NULL DEFAULT '{}',
  courses_en TEXT[] NOT NULL DEFAULT '{}',
  education JSONB NOT NULL DEFAULT '[]',
  current_researches JSONB NOT NULL DEFAULT '[]',
  completed_researches JSONB NOT NULL DEFAULT '[]',
  notices JSONB NOT NULL DEFAULT '[]',
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.faculty_profiles ENABLE ROW LEVEL SECURITY;

-- 6. RLS for faculty_profiles
CREATE POLICY "Anyone can view faculty profiles"
  ON public.faculty_profiles FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage all faculty profiles"
  ON public.faculty_profiles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Faculty can update own profile"
  ON public.faculty_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- 7. Website content table (for editable text blocks)
CREATE TABLE public.website_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT NOT NULL UNIQUE,
  content_vi TEXT NOT NULL DEFAULT '',
  content_en TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.website_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view website content"
  ON public.website_content FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage website content"
  ON public.website_content FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 8. Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_faculty_profiles_updated_at
  BEFORE UPDATE ON public.faculty_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_website_content_updated_at
  BEFORE UPDATE ON public.website_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 9. Storage bucket for faculty avatars
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Authenticated users can upload avatars"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "Users can update their own avatars"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'avatars');
