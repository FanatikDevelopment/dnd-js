import React from 'react';
import { Race } from '@dnd-js/core';
import { Box, Chip, Divider, Grid, Stack, Typography } from '@mui/material';

import HeightIcon from '@mui/icons-material/Height';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import VisibilityIcon from '@mui/icons-material/Visibility';

type Props = {
  race: Race;
};

export function RaceView({ race }: Props) {
  return (
    <Box p={1}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="h4" textTransform="capitalize">
          {race.name}
        </Typography>
        <Chip color="primary" label={race.size} icon={<HeightIcon />} />
      </Stack>
      <Divider />
      <Grid container pt={1} pl={2} spacing={1} alignItems="center">
        <Grid item xs={6}>
          <Typography variant="h5" textTransform="capitalize">
            Speed:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Chip
            color="primary"
            label={race.speed}
            icon={<DirectionsRunIcon />}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5" textTransform="capitalize">
            Dark Vision:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Chip
            color="primary"
            label={race.darkVision}
            icon={<VisibilityIcon />}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5" textTransform="capitalize">
            Alignments:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1} direction="row">
            {race.alignments.map((align) => (
              <Chip
                key={align}
                color="primary"
                label={align}
                sx={{ textTransform: 'uppercase' }}
              />
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5" textTransform="capitalize">
            Languages:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1} direction="row">
            {race.languages.map((lang) => (
              <Chip
                key={lang}
                color="primary"
                label={lang}
                sx={{ textTransform: 'capitalize' }}
              />
            ))}
          </Stack>
        </Grid>
        {!!race.languageSelectors.length && (
          <>
            {race.languageSelectors.map((nof) => (
              <React.Fragment key={nof.of.map((current) => current).join(' ')}>
                <Grid item xs={12}>
                  <Typography variant="h6" pl={1}>
                    Select {nof.n} of:
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" flexWrap="wrap" spacing={1}>
                    {nof.of.map((lang) => (
                      <Chip
                        key={lang}
                        sx={{ textTransform: 'capitalize' }}
                        label={lang}
                      />
                    ))}
                  </Stack>
                </Grid>
              </React.Fragment>
            ))}
          </>
        )}
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Abilities:</Typography>
        </Grid>
        {Object.entries(race.abilityBonuses).map(([key, value]) => (
          <React.Fragment key={key}>
            <Grid item xs={6} md={3}>
              <Typography pl={3} textTransform="capitalize">
                {key}:
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Chip
                label={value > 0 ? `+${value}` : value}
                color={value > 0 ? 'success' : 'error'}
              />
            </Grid>
          </React.Fragment>
        ))}
        {!!race.abilityBonusSelectors.length && (
          <>
            {race.abilityBonusSelectors.map((nof) => (
              <React.Fragment
                key={nof.of
                  .map((current) => `${current.ability}×${current.bonus}`)
                  .join(' ')}
              >
                <Grid item xs={12}>
                  <Typography variant="h6" pl={1}>
                    Select {nof.n} of:
                  </Typography>
                </Grid>
                {nof.of.map(({ ability, bonus }) => (
                  <React.Fragment key={ability}>
                    <Grid item xs={6} md={3}>
                      <Typography pl={3} textTransform="capitalize">
                        {ability}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Chip
                        key={ability}
                        label={bonus > 0 ? `+${bonus}` : bonus}
                        color={bonus > 0 ? 'success' : 'error'}
                      />
                    </Grid>
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </>
        )}
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Saving Throws:</Typography>
        </Grid>
        {Object.entries(race.savingThrows).map(([key, value]) => (
          <React.Fragment key={key}>
            <Grid item xs={6}>
              <Typography pl={3} textTransform="capitalize">
                {key}:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Chip
                label={value}
                color="primary"
                sx={{ textTransform: 'capitalize' }}
              />
            </Grid>
          </React.Fragment>
        ))}
        {!!race.savingThrowSelectors.length && (
          <>
            {race.savingThrowSelectors.map((nof) => (
              <React.Fragment
                key={nof.of
                  .map((current) => `${current.type}×${current.bonus}`)
                  .join(' ')}
              >
                <Grid item xs={12}>
                  <Typography variant="h6" pl={1}>
                    Select {nof.n} of:
                  </Typography>
                </Grid>
                {nof.of.map(({ type, bonus }) => (
                  <React.Fragment key={type}>
                    <Grid item xs={6}>
                      <Typography pl={3} textTransform="capitalize">
                        {type}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Chip
                        key={type}
                        label={bonus}
                        color="primary"
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </Grid>
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </>
        )}

        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Damage Resistances:</Typography>
        </Grid>
        {Object.entries(race.damageResistances).map(([key, value]) => (
          <React.Fragment key={key}>
            <Grid item xs={6}>
              <Typography pl={3} textTransform="capitalize">
                {key}:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Chip label={value} color="primary" />
            </Grid>
          </React.Fragment>
        ))}
        {!!race.damageResistanceSelectors.length && (
          <>
            {race.savingThrowSelectors.map((nof) => (
              <React.Fragment
                key={nof.of
                  .map((current) => `${current.type}×${current.bonus}`)
                  .join(' ')}
              >
                <Grid item xs={12}>
                  <Typography variant="h6" pl={1}>
                    Select {nof.n} of:
                  </Typography>
                </Grid>
                {nof.of.map(({ type, bonus }) => (
                  <React.Fragment key={type}>
                    <Grid item xs={6}>
                      <Typography pl={3} textTransform="capitalize">
                        {type}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Chip key={type} label={bonus} color="primary" />
                    </Grid>
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </>
        )}
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Proficiencies:</Typography>
        </Grid>
        {race.proficiencies.map((name) => (
          <Grid item xs={6} key={name}>
            <Typography pl={1} textTransform="capitalize">
              {name}:
            </Typography>
          </Grid>
        ))}
        {!!race.proficiencySelectors.length && (
          <>
            <Grid item xs={12}>
              <Typography variant="h5">Proficiency Selectors:</Typography>
            </Grid>
            {race.proficiencySelectors.map((nof) => (
              <React.Fragment key={nof.of.join(' ')}>
                <Grid item xs={12}>
                  <Typography variant="h5" pl={1}>
                    Select {nof.n} of:
                  </Typography>
                </Grid>
                {nof.of.map((name) => (
                  <React.Fragment key={name}>
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                      <Typography pl={3} textTransform="capitalize">
                        {name}
                      </Typography>
                    </Grid>
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </>
        )}
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Traits:</Typography>
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" spacing={1} pt={1} pl={3}>
          {race.traits.map((trait) => (
            <Chip color="primary" key={trait} label={trait} />
          ))}
        </Stack>
      </Grid>
    </Box>
  );
}

export default RaceView;
