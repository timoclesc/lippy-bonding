'use client';

import { Typography, Container, Box, FormControlLabel, Checkbox } from "@mui/material";
import { lightGreen, red, yellow } from "@mui/material/colors";
import { useState, useEffect } from "react";

type question = {
  id: number;
  questionText: string;
  category: 'casual' | 'close' | 'intimate';
}

const questions: question[] = [
  { id: 1, questionText: "What's a long held belief that you recently changed?", category: "close" },
  { id: 2, questionText: "What's a non-negotiable in your friendships?", category: "close" },
  { id: 3, questionText: "If you could go back in time and change a decision, what would it be?", category: "intimate" },
  { id: 4, questionText: "How open are you?", category: "close" },
  { id: 5, questionText: "What are your top 3 values?", category: "close" },
  { id: 6, questionText: "Who's one person you can rely on in an emergency?", category: "casual" },
  { id: 7, questionText: "Who is your favourite parent / sibling / child / nibling?", category: "casual" },
  { id: 8, questionText: "What's your most cherished memory with your family?", category: "intimate" },
  { id: 9, questionText: "What's been weighing on your heart recently?", category: "intimate" },
  { id: 10, questionText: "What do you like about your job / course?", category: "casual" },
  { id: 11, questionText: "Describe a parent.", category: "casual" },
  { id: 12, questionText: "Describe yourself in 3 words.", category: "casual" },
  { id: 13, questionText: "What keeps you up?", category: "intimate" },
  { id: 14, questionText: "What's a small pleasure you experience every day?", category: "casual" },
  { id: 15, questionText: "Do you believe everyone deserves a second chance?", category: "intimate" },
  { id: 16, questionText: "If you were a carb, what would it be?", category: "casual" },
  { id: 17, questionText: "Jorts or chaps?", category: "casual" },
  { id: 18, questionText: "Karaoke or dance floor?", category: "casual" },
  { id: 19, questionText: "What is your happiest memory as a child?", category: "close" },
  { id: 20, questionText: "What is a risk you took that didn't pay off?", category: "close" },
  { id: 21, questionText: "What's something you learned about yourself recently?", category: "close" },
  { id: 22, questionText: "What's your spirit animal?", category: "casual" },
  { id: 23, questionText: "When was the last time you experienced awe?", category: "close" },
  { id: 24, questionText: "What's something your regret?", category: "intimate" },
  { id: 25, questionText: "What's something you've dreamed of doing but haven't yet?", category: "intimate" },
  { id: 26, questionText: "What are you proud of?", category: "intimate" },
  { id: 27, questionText: "What does 'living a good life' mean to you?", category: "intimate" },
  { id: 28, questionText: "Are you OK?", category: "intimate" },
  { id: 28, questionText: "What's your frisbee dream?", category: "close" },
 
];

export default function Home() {
  const [answers, setAnswers] = useState<{ [key: number]: boolean }>(
    questions.reduce((acc, question) => {
      acc[question.id] = false;
      return acc;
    }, {} as { [key: number]: false })
  );

  const handleInputChange = (id: number, value: boolean) => {
    setAnswers((prevAnswers: { [key: number]: boolean }) => {
      const newAnswers = { ...prevAnswers, [id]: value };
      localStorage.setItem("checkboxes", JSON.stringify(newAnswers));
      return newAnswers;
    });
  };

  useEffect(
    () => {
      const prevAnswers = localStorage.getItem("checkboxes");

      try {
        if (prevAnswers) {
          setAnswers(JSON.parse(prevAnswers));
        }
      } catch (e) {
        console.log(e);
      }
    }, []
  );

  return (
    <Container>
      <Typography variant="h4" marginBlockEnd={2}>No strangers here</Typography>
      <Typography variant="body1" marginBlockEnd={2}>In groups of 3, take turns answering the questions below. Progress at your own pace. They&apos;ll get more intimate as you go.</Typography>
      {['casual', 'close', 'intimate'].map(
        (dif, i) => (
          <Box key={dif} sx={{
            borderRadius: 1,
            bgcolor: [lightGreen[50], yellow[50], red[50]][i],
            padding: 2,
            marginBlock: 2,
          }}>
            <Typography variant="h5" textAlign={'center'} marginBlockEnd={2}>{dif.charAt(0).toUpperCase() + dif.slice(1)}</Typography>
            {
              questions.filter(q => q.category == dif).map((question, i) => {
                return (
                  <Box key={question.id} mb={2} paddingBlockStart={2} borderTop={i > 0 ? "1px solid" : undefined}>
                    <FormControlLabel sx={{display: 'flex', justifyContent: 'space-between', marginInlineStart: 0, textWrap: 'balance'}} labelPlacement={"start"} control={<Checkbox value={answers[question.id]} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleInputChange(question.id, event.target.checked);
                    }} />} label={question.questionText}
                      />
                  </Box>
                )
              })
            }
          </Box>
        )

      )}

    </Container>
  );
}
