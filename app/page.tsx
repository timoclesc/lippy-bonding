'use client';

import { TextField, Typography, Container, Box } from "@mui/material";
import { lightGreen, red, yellow } from "@mui/material/colors";
import { useState, useEffect } from "react";

type question = {
  id: number;
  questionText: string;
  category: 'easy' | 'medium' | 'hard';
}

const questions: question[] = [
  { id: 1, questionText: "Eye colour", category: "easy" },
  { id: 2, questionText: "Favourite food / dish", category: "medium" },
  { id: 3, questionText: "Birth month", category: "easy" },
  { id: 4, questionText: "Favourite throw", category: "easy" },
  { id: 5, questionText: "Opinions on the free market", category: "hard" },
  { id: 6, questionText: "Home town", category: "easy" },
  { id: 7, questionText: "Number of siblings", category: "easy" },
  { id: 8, questionText: "University / College / Highschool", category: "medium" },
  { id: 9, questionText: "Shorts", category: "hard" },
  { id: 10, questionText: "Street Number", category: "medium" },
  { id: 11, questionText: "Pet name", category: "hard" },
  { id: 12, questionText: "Years playing", category: "medium" },
  { id: 13, questionText: "Starting year at Ellipsis", category: "easy" },
  { id: 14, questionText: "1RM squat (+/- 5kg)", category: "medium" },
  { id: 15, questionText: "# of piercings", category: "medium" },
  { id: 16, questionText: "Rock / Paper / Scissors first move", category: "medium" },
  { id: 17, questionText: "First name", category: "hard" },
  { id: 18, questionText: "Favourite sport (not fris)", category: "medium" },
  { id: 19, questionText: "Favourite Pokemon", category: "hard" },
  { id: 20, questionText: "Favourite musical artist", category: "hard" },
  { id: 21, questionText: "Mother's maiden name", category: "hard" },
  { id: 22, questionText: "MyGovId", category: "hard" },
  { id: 23, questionText: "Cyclone size", category: "easy" },
  { id: 24, questionText: "Religous / spiritual belief system", category: "medium" },
  { id: 24, questionText: "# of National titles", category: "medium" },
];

export default function Home() {
  const [answers, setAnswers] = useState<{ [key: number]: string }>(
    questions.reduce((acc, question) => {
      acc[question.id] = "";
      return acc;
    }, {} as { [key: number]: string })
  );

  const handleInputChange = (id: number, value: string) => {
    setAnswers((prevAnswers: { [key: number]: string }) => {
      const newAnswers = { ...prevAnswers, [id]: value };
      localStorage.setItem("answers", JSON.stringify(newAnswers));
      return newAnswers;
    });
  };

  useEffect(
    () => {
      const prevAnswers = localStorage.getItem("answers");

      try {
        if (prevAnswers) {
          setAnswers(JSON.parse(prevAnswers));
        }
      } catch (e) {
        console.log(e);
      }
    }, []
  );

  function calculateScore() {
    const scoreCard = {
      easy: 1,
      medium: 3,
      hard: 7,
    };

    return questions.reduce((prev, curr) => {
      return answers[curr.id] ? prev + scoreCard[curr.category] : prev;
    }, 0);
  }


  return (
    <Container>
      <Typography variant="h4" marginBlockEnd={2}>Lipper Scavenger Hunt</Typography>
      <Typography variant="body1" marginBlockEnd={2}>Find people who have the same attributes as you. Put in their names against each field to keep track. You can&apos;t have the same person for more than one question, so search widely. Your score is totalled at the bottom of the page. The highest score doesn&apos;t necessarily win&hellip;</Typography>
      {['easy', 'medium', 'hard'].map(
        (dif, i) => (
          <Box key={dif} sx={{
            borderRadius: 1,
            bgcolor: [lightGreen[50], yellow[50], red[50]][i],
            padding: 2,
            marginBlock: 2,
          }}>
            <Typography variant="h5" textAlign={'center'} marginBlockEnd={2}>{dif.charAt(0).toUpperCase() + dif.slice(1)}</Typography>
            {
              questions.filter(q => q.category == dif).map((question) => {
                const hasError = answers[question.id]?.length > 0
                  && Object.values(answers).filter((answer) => answer === answers[question.id]).length > 1;
                return (
                  <Box key={question.id} mb={2}>
                    <TextField label={question.questionText} fullWidth variant="outlined" value={answers[question.id]}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        handleInputChange(question.id, event.target.value);
                      }}
                      sx={{backgroundColor: 'white'}}
                      error={hasError}
                      helperText={hasError ? "Make sure your answers are unique" : undefined}
                    />
                  </Box>
                )
              })
            }
          </Box>
        )

      )}

      <Typography variant="h6" textAlign={"center"} marginBlockStart={6} marginBlockEnd={10}>Total Score: {calculateScore()}</Typography>
    </Container>
  );
}
