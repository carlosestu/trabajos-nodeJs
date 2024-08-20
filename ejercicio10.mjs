function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));

    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  });
}
async function getResults(player1, player2, player3) {
  try {
    const player1result = await luckyDraw(player1);
    console.log(player1result);
  } catch (error) {
    console.error("error,", error.message);
    }
    try {
      const player2result = await luckyDraw(player2);
      console.log(player2result);
    } catch (error) {
      console.error("error,", error.message);
      }
      try {
        const player3result = await luckyDraw(player3);
        console.log(player3result);
      } catch (error) {
        console.error("error,", error.message);
        }
}
getResults("Tina", "Jorge", "Julien");