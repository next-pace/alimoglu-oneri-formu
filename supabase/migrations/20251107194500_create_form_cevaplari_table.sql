/*
  # Create feedback form responses table

  1. New Tables
    - `form_cevaplari`
      - `id` (uuid, primary key) - Unique identifier for each response
      - `cinsiyet` (text) - Gender selection (Erkek/Kadın)
      - `fabrika` (text) - Selected factory name
      - `urun_ismi` (text) - Product name entered by user
      - `memnuniyet` (boolean) - Satisfaction with vending machine (true=Evet, false=Hayır)
      - `notlar` (text, nullable) - Optional notes from user
      - `created_at` (timestamptz) - Timestamp of form submission
  
  2. Security
    - Enable RLS on `form_cevaplari` table
    - Add policy to allow anyone to insert feedback (public form)
    - Add policy to allow authenticated users to read all feedback
*/

CREATE TABLE IF NOT EXISTS form_cevaplari (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cinsiyet text NOT NULL,
  fabrika text NOT NULL,
  urun_ismi text NOT NULL,
  memnuniyet boolean NOT NULL,
  notlar text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE form_cevaplari ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit feedback"
  ON form_cevaplari
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all feedback"
  ON form_cevaplari
  FOR SELECT
  TO authenticated
  USING (true);
