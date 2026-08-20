import type {
  FeatureCollection,
  Geometry,
} from "geojson";

export interface DemoFeatureProperties {
  id: number;
  featureId: string;
  category: string;
  relatedRecordCount: number;
}

export const demoMapFeatures: FeatureCollection<
  Geometry,
  DemoFeatureProperties
> = {
  type: "FeatureCollection",

  features: [
    // -------------------------------------------------- LINE FEATURES --------------------------------------------------
    {
      type: "Feature",
      properties: {
        id: 1,
        featureId: "SEG-1001",
        category: "Linear Asset",
        relatedRecordCount: 3,
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-104.999, 39.748],
          [-104.994, 39.746],
          [-104.989, 39.744],
          [-104.984, 39.742],
        ],
      },
    },

    {
      type: "Feature",
      properties: {
        id: 2,
        featureId: "SEG-1002",
        category: "Linear Asset",
        relatedRecordCount: 2,
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-104.984, 39.742],
          [-104.979, 39.740],
          [-104.974, 39.738],
        ],
      },
    },

    {
      type: "Feature",
      properties: {
        id: 3,
        featureId: "SEG-1003",
        category: "Linear Asset",
        relatedRecordCount: 4,
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-105.002, 39.738],
          [-104.996, 39.740],
          [-104.990, 39.741],
          [-104.984, 39.742],
        ],
      },
    },

    {
      type: "Feature",
      properties: {
        id: 4,
        featureId: "SEG-1004",
        category: "Linear Asset",
        relatedRecordCount: 1,
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-104.990, 39.754],
          [-104.989, 39.749],
          [-104.988, 39.744],
          [-104.984, 39.742],
        ],
      },
    },

    {
      type: "Feature",
      properties: {
        id: 5,
        featureId: "SEG-1005",
        category: "Linear Asset",
        relatedRecordCount: 3,
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-104.996, 39.740],
          [-104.995, 39.735],
          [-104.993, 39.730],
        ],
      },
    },

    // -------------------------------------------------- POINT FEATURES --------------------------------------------------

    {
      type: "Feature",
      properties: {
        id: 6,
        featureId: "SITE-2001",
        category: "Site",
        relatedRecordCount: 5,
      },
      geometry: {
        type: "Point",
        coordinates: [-104.984, 39.742],
      },
    },

    {
      type: "Feature",
      properties: {
        id: 7,
        featureId: "SITE-2002",
        category: "Site",
        relatedRecordCount: 2,
      },
      geometry: {
        type: "Point",
        coordinates: [-104.996, 39.740],
      },
    },

    {
      type: "Feature",
      properties: {
        id: 8,
        featureId: "SITE-2003",
        category: "Site",
        relatedRecordCount: 1,
      },
      geometry: {
        type: "Point",
        coordinates: [-104.989, 39.749],
      },
    },

    {
      type: "Feature",
      properties: {
        id: 9,
        featureId: "SITE-2004",
        category: "Site",
        relatedRecordCount: 4,
      },
      geometry: {
        type: "Point",
        coordinates: [-104.974, 39.738],
      },
    },

    // -------------------------------------------------- POLYGON FEATURES --------------------------------------------------

    {
      type: "Feature",
      properties: {
        id: 10,
        featureId: "AREA-3001",
        category: "Operational Area",
        relatedRecordCount: 6,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-105.003, 39.751],
            [-104.998, 39.751],
            [-104.998, 39.747],
            [-105.003, 39.747],
            [-105.003, 39.751],
          ],
        ],
      },
    },

    {
      type: "Feature",
      properties: {
        id: 11,
        featureId: "AREA-3002",
        category: "Operational Area",
        relatedRecordCount: 3,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-104.981, 39.746],
            [-104.976, 39.746],
            [-104.976, 39.742],
            [-104.981, 39.742],
            [-104.981, 39.746],
          ],
        ],
      },
    },

    {
      type: "Feature",
      properties: {
        id: 12,
        featureId: "AREA-3003",
        category: "Operational Area",
        relatedRecordCount: 2,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-104.992, 39.736],
            [-104.987, 39.736],
            [-104.987, 39.732],
            [-104.992, 39.732],
            [-104.992, 39.736],
          ],
        ],
      },
    },
  ],
};