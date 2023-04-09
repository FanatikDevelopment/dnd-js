import {
  Box,
  Card,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  Collapse,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  useTheme,
  alpha,
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreOutlined';

import { HTMLProps, useEffect, useRef, useState } from 'react';
import DemoScene from './DemoScene';

import { Renderer } from '../../engine';
import { CameraType } from '../../engine/core/types';
import { glMatrix, mat4, quat, vec3 } from 'gl-matrix';
import { colors } from '../../styles/theme';

/* eslint-disable-next-line */
export interface TerrainProps {}

export function Terrain(props: TerrainProps) {
  const theme = useTheme();
  const resizeObserver = useRef<ResizeObserver | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderer = useRef<Renderer | null>(null);
  const scene = useRef<DemoScene | null>(null);
  const [ready, setReady] = useState(false);
  const [openToolTab, setOpenToolTab] = useState<string[]>([]);
  const [camera, setCamera] = useState<{
    type: CameraType;
    position: { x: number; y: number; z: number };
    target: { x: number; y: number; z: number };
    up: { x: number; y: number; z: number };
    near: number;
    far: number;
    fov: number;
  }>({
    type: 'perspective',
    position: { x: 0, y: 0, z: 0 },
    target: { x: 0, y: 0, z: 0 },
    up: { x: 0, y: 0, z: 0 },
    near: 0,
    far: 0,
    fov: 0,
  });

  const [transform, setTransform] = useState<{
    position: { x: number; y: number; z: number };
    rotation: { x: number; y: number; z: number };
    scale: { x: number; y: number; z: number };
  }>({
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 0, y: 0, z: 0 },
  });

  useEffect(() => {
    if (!canvasRef.current || ready) {
      return;
    }

    if (renderer.current || resizeObserver.current || scene.current) {
      return;
    }

    const ctx = canvasRef.current.getContext('webgl2');
    if (!ctx) {
      return;
    }

    const resizeCanvas = () => {
      if (!canvasRef.current) {
        return;
      }

      canvasRef.current.width = canvasRef.current.offsetWidth;
      canvasRef.current.height = canvasRef.current.offsetHeight;
      if (scene.current) {
        scene.current.resize();
      }
    };

    resizeCanvas();

    resizeObserver.current = new ResizeObserver(() => {
      resizeCanvas();
      renderer.current?.resizeViewport();
      scene.current?.render();
    });

    resizeObserver.current.observe(canvasRef.current);

    renderer.current = new Renderer(ctx, {
      clearBufferBits: ctx.COLOR_BUFFER_BIT,
    });

    scene.current = new DemoScene(renderer.current, {
      state: 'init',
    });

    renderer.current
      .init(() => scene.current!.init())
      .then(() => {
        setReady(true);

        const camera = scene.current!.camera;
        scene.current!.updateModelMatrix();
        setCamera({
          type: camera.type,
          position: camera.position,
          target: camera.target,
          up: camera.up,
          near: camera.near,
          far: camera.far,
          fov: (camera.fov / Math.PI) * 180,
        });
        scene.current!.render();
      });
  }, [ready]);

  return (
    <Box
      width="100%"
      height="calc(100vh - 2.75rem)"
      position="relative"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Collapse in={true} orientation="horizontal">
        <Paper
          sx={{
            position: 'absolute',
            height: '100%',
            overflow: 'auto',
            px: 1,
            py: 1,
            color: colors['sideBarTitle.foreground'],
            bgcolor: alpha(colors['sideBar.background'], 0.6),
          }}
        >
          <List dense>
            <ListItemButton
              sx={{
                py: 0,
                px: 0.5,
                mb: 0.5,
              }}
              onClick={() => {
                const others = openToolTab.filter(
                  (name) => name !== 'transform'
                );
                if (others.length !== openToolTab.length) {
                  setOpenToolTab(others);
                } else {
                  setOpenToolTab([...others, 'transform']);
                }
              }}
            >
              <ListItemText
                primary="Transform"
                sx={{
                  '.MuiListItemText-primary': {
                    fontSize: theme.typography.h6,
                  },
                }}
              />
              {openToolTab.includes('transform') ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )}
            </ListItemButton>
            <Collapse
              in={openToolTab.includes('transform')}
              sx={{ mx: 2, mb: 1 }}
            >
              <Typography>Position</Typography>
              <Stack spacing={1} direction="row">
                <TextField
                  sx={{
                    width: '6rem',
                  }}
                  label="x"
                  type="number"
                  inputProps={{ step: 0.5 }}
                  disabled={!ready}
                  value={transform.position.x}
                  onChange={(event) => {
                    const x = parseFloat(event.target.value);
                    const pos = scene.current!.transform.position;
                    pos.x = x;
                    scene.current!.transform.position = pos;

                    setTransform((current) => ({
                      ...current,
                      position: { ...current.position, x },
                    }));
                  }}
                />
                <TextField
                  sx={{
                    width: '6rem',
                  }}
                  label="y"
                  type="number"
                  inputProps={{ step: 0.5 }}
                  disabled={!ready}
                  value={transform.position.y}
                  onChange={(event) => {
                    const y = parseFloat(event.target.value);
                    const pos = scene.current!.transform.position;
                    pos.y = y;
                    scene.current!.transform.position = pos;

                    setTransform((current) => ({
                      ...current,
                      position: { ...current.position, y },
                    }));
                  }}
                />
                <TextField
                  sx={{
                    width: '6rem',
                  }}
                  label="z"
                  type="number"
                  inputProps={{ step: 0.5 }}
                  disabled={!ready}
                  value={transform.position.z}
                  onChange={(event) => {
                    const z = parseFloat(event.target.value);
                    const pos = scene.current!.transform.position;
                    pos.z = z;
                    scene.current!.transform.position = pos;

                    setTransform((current) => ({
                      ...current,
                      position: { ...current.position, z },
                    }));
                  }}
                />
              </Stack>
              <Typography>Rotation</Typography>
              <Stack spacing={1} direction="row">
                <TextField
                  sx={{
                    width: '6rem',
                  }}
                  label="x"
                  type="number"
                  inputProps={{ step: 15 }}
                  disabled={!ready}
                  value={transform.rotation.x}
                  onChange={(event) => {
                    const x = parseFloat(event.target.value);
                    scene.current!.transform.orientationQuat = quat.fromEuler(
                      scene.current!.transform.orientationQuat,
                      x,
                      transform.rotation.y,
                      transform.rotation.z
                    );

                    setTransform((current) => ({
                      ...current,
                      rotation: { ...current.rotation, x },
                    }));
                  }}
                />
                <TextField
                  sx={{
                    width: '6rem',
                  }}
                  label="y"
                  type="number"
                  inputProps={{ step: 15 }}
                  disabled={!ready}
                  value={transform.rotation.y}
                  onChange={(event) => {
                    const y = parseFloat(event.target.value) % 360;
                    scene.current!.transform.orientationQuat = quat.fromEuler(
                      scene.current!.transform.orientationQuat,
                      transform.rotation.x,
                      y,
                      transform.rotation.z
                    );

                    setTransform((current) => ({
                      ...current,
                      rotation: { ...current.rotation, y },
                    }));
                  }}
                />
                <TextField
                  sx={{
                    width: '6rem',
                  }}
                  label="z"
                  type="number"
                  inputProps={{ step: 15 }}
                  disabled={!ready}
                  value={transform.rotation.z}
                  onChange={(event) => {
                    const z = parseFloat(event.target.value);
                    scene.current!.transform.orientationQuat = quat.fromEuler(
                      scene.current!.transform.orientationQuat,
                      transform.rotation.x,
                      transform.rotation.y,
                      z
                    );

                    setTransform((current) => ({
                      ...current,
                      rotation: { ...current.rotation, z },
                    }));
                  }}
                />
              </Stack>
              <Typography>Scale</Typography>
              <Stack spacing={1} direction="row">
                <TextField
                  sx={{
                    width: '6rem',
                  }}
                  label="x"
                  type="number"
                  inputProps={{ step: 0.5, min: 0.001 }}
                  disabled={!ready}
                  value={transform.scale.x}
                  onChange={(event) => {
                    const x = parseFloat(event.target.value);
                    const scale = scene.current!.transform.scale;
                    scale.x = x;
                    scene.current!.transform.scale = scale;

                    setTransform((current) => ({
                      ...current,
                      scale: { ...current.scale, x },
                    }));
                  }}
                />
                <TextField
                  sx={{
                    width: '6rem',
                  }}
                  label="y"
                  type="number"
                  inputProps={{ step: 0.5, min: 0.001 }}
                  disabled={!ready}
                  value={transform.scale.y}
                  onChange={(event) => {
                    const y = parseFloat(event.target.value);
                    const scale = scene.current!.transform.scale;
                    scale.y = y;
                    scene.current!.transform.scale = scale;

                    setTransform((current) => ({
                      ...current,
                      scale: { ...current.scale, y },
                    }));
                  }}
                />
                <TextField
                  sx={{
                    width: '6rem',
                  }}
                  label="z"
                  type="number"
                  inputProps={{ step: 0.5, min: 0.001 }}
                  disabled={!ready}
                  value={transform.scale.z}
                  onChange={(event) => {
                    const z = parseFloat(event.target.value);
                    const scale = scene.current!.transform.scale;
                    scale.z = z;
                    scene.current!.transform.scale = scale;

                    setTransform((current) => ({
                      ...current,
                      scale: { ...current.scale, z },
                    }));
                  }}
                />
              </Stack>
            </Collapse>

            <ListItemButton
              sx={{
                py: 0,
                px: 0.5,
                mb: 0.5,
              }}
              onClick={() => {
                const others = openToolTab.filter((name) => name !== 'camera');
                if (others.length !== openToolTab.length) {
                  setOpenToolTab(others);
                } else {
                  setOpenToolTab([...others, 'camera']);
                }
              }}
            >
              <ListItemText
                primary="Camera"
                sx={{
                  '.MuiListItemText-primary': {
                    fontSize: theme.typography.h6,
                  },
                }}
              />
              {openToolTab.includes('camera') ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )}
            </ListItemButton>
            <Collapse in={openToolTab.includes('camera')} sx={{ mx: 2 }}>
              <Stack
                spacing={1}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography>Camera Type</Typography>
                <Select
                  label="Camera Type"
                  disabled={!ready}
                  value={camera.type}
                  onChange={(event) => {
                    const value = event.target.value as CameraType;
                    scene.current!.camera.type = value;
                    setCamera((current) => ({ ...current, type: value }));
                  }}
                >
                  <MenuItem value={'orthographic'}>Orthographic</MenuItem>
                  <MenuItem value={'perspective'}>Perspective</MenuItem>
                  <MenuItem value={'frustum'}>Frustum</MenuItem>
                </Select>
              </Stack>
              <Typography>Position</Typography>
              <Stack spacing={1} direction="row">
                <TextField
                  sx={{
                    width: '6rem',
                  }}
                  label="x"
                  type="number"
                  inputProps={{ step: 0.5 }}
                  disabled={!ready}
                  value={camera.position.x}
                  onChange={(event) => {
                    const x = parseFloat(event.target.value);
                    scene.current!.camera.setOptions({ position: { x } });

                    setCamera((current) => ({
                      ...current,
                      position: scene.current!.camera.position,
                    }));
                  }}
                />
                <TextField
                  sx={{
                    width: '6rem',
                  }}
                  label="y"
                  type="number"
                  inputProps={{ step: 0.5 }}
                  disabled={!ready}
                  value={camera.position.y}
                  onChange={(event) => {
                    const y = parseFloat(event.target.value);
                    scene.current!.camera.setOptions({ position: { y } });

                    setCamera((current) => ({
                      ...current,
                      position: scene.current!.camera.position,
                    }));
                  }}
                />
                <TextField
                  sx={{
                    width: '6rem',
                  }}
                  label="z"
                  type="number"
                  inputProps={{ step: 0.5 }}
                  disabled={!ready}
                  value={camera.position.z}
                  onChange={(event) => {
                    const z = parseFloat(event.target.value);
                    scene.current!.camera.setOptions({ position: { z } });

                    setCamera((current) => ({
                      ...current,
                      position: scene.current!.camera.position,
                    }));
                  }}
                />
              </Stack>
              <Typography>Target</Typography>
              <Stack spacing={1} direction="row">
                <TextField
                  sx={{
                    width: '6rem',
                  }}
                  label="x"
                  type="number"
                  inputProps={{ step: 0.5 }}
                  disabled={!ready}
                  value={camera.target.x}
                  onChange={(event) => {
                    const x = parseFloat(event.target.value);
                    scene.current!.camera.setOptions({ target: { x } });

                    setCamera((current) => ({
                      ...current,
                      target: scene.current!.camera.target,
                    }));
                  }}
                />
                <TextField
                  sx={{
                    width: '6rem',
                  }}
                  label="y"
                  type="number"
                  inputProps={{ step: 0.5 }}
                  disabled={!ready}
                  value={camera.target.y}
                  onChange={(event) => {
                    const y = parseFloat(event.target.value);
                    scene.current!.camera.setOptions({ target: { y } });

                    setCamera((current) => ({
                      ...current,
                      target: scene.current!.camera.target,
                    }));
                  }}
                />
                <TextField
                  sx={{
                    width: '6rem',
                  }}
                  label="z"
                  type="number"
                  inputProps={{ step: 0.5 }}
                  disabled={!ready}
                  value={camera.target.z}
                  onChange={(event) => {
                    const z = parseFloat(event.target.value);
                    scene.current!.camera.setOptions({ target: { z } });

                    setCamera((current) => ({
                      ...current,
                      target: scene.current!.camera.target,
                    }));
                  }}
                />
              </Stack>
              <Typography>Up</Typography>
              <Stack spacing={1} direction="row">
                <TextField
                  sx={{
                    width: '6rem',
                  }}
                  label="x"
                  type="number"
                  inputProps={{ step: 0.5 }}
                  disabled={!ready}
                  value={camera.up.x}
                  onChange={(event) => {
                    const x = parseFloat(event.target.value);
                    scene.current!.camera.setOptions({ up: { x } });

                    setCamera((current) => ({
                      ...current,
                      up: scene.current!.camera.up,
                    }));
                  }}
                />
                <TextField
                  sx={{
                    width: '6rem',
                  }}
                  label="y"
                  type="number"
                  inputProps={{ step: 0.5 }}
                  disabled={!ready}
                  value={camera.up.y}
                  onChange={(event) => {
                    const y = parseFloat(event.target.value);
                    scene.current!.camera.setOptions({ up: { y } });

                    setCamera((current) => ({
                      ...current,
                      up: scene.current!.camera.up,
                    }));
                  }}
                />
                <TextField
                  sx={{
                    width: '6rem',
                  }}
                  label="z"
                  type="number"
                  inputProps={{ step: 0.5 }}
                  disabled={!ready}
                  value={camera.up.z}
                  onChange={(event) => {
                    const z = parseFloat(event.target.value);
                    scene.current!.camera.setOptions({ up: { z } });

                    setCamera((current) => ({
                      ...current,
                      up: scene.current!.camera.up,
                    }));
                  }}
                />
              </Stack>
              <Typography>Near / Far / Fov</Typography>
              <Stack spacing={1} direction="row">
                <TextField
                  sx={{
                    width: '6rem',
                  }}
                  label="near"
                  type="number"
                  inputProps={{ step: 0.05 }}
                  value={camera.near}
                  onChange={(event) => {
                    const value = parseFloat(event.target.value);
                    scene.current!.camera.near = value;

                    setCamera((current) => ({
                      ...current,
                      near: value,
                    }));
                  }}
                />
                <TextField
                  sx={{
                    width: '6rem',
                  }}
                  label="far"
                  type="number"
                  inputProps={{ step: 0.5 }}
                  value={camera.far}
                  onChange={(event) => {
                    const value = parseFloat(event.target.value);
                    scene.current!.camera.far = value;

                    setCamera((current) => ({
                      ...current,
                      far: value,
                    }));
                  }}
                />
                <TextField
                  sx={{
                    width: '6rem',
                  }}
                  label="fov"
                  type="number"
                  inputProps={{ step: 0.5 }}
                  value={camera.fov}
                  onChange={(event) => {
                    const value = parseFloat(event.target.value);
                    scene.current!.camera.fov = glMatrix.toRadian(value);

                    setCamera((current) => ({
                      ...current,
                      fov: value,
                    }));
                  }}
                />
              </Stack>
            </Collapse>
          </List>
        </Paper>
      </Collapse>

      <canvas
        ref={canvasRef}
        style={{ border: 'solid 1px black', width: '100%', height: '100%' }}
      ></canvas>
    </Box>
  );
}

export default Terrain;
