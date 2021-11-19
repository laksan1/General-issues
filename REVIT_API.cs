/**
* Disserialize json
*/
public static T Deserialize<T>(string json) where T : new()
{
	try
	{
		var obj = JsonConvert.DeserializeObject<T>(json, Settings);
		return obj;
	}
	catch (Exception ex)
	{
		Log.WriteLog($"Error: Failed to deserialize json string into a valid object___{ex.Message}");
		throw new Exception($"Error: Failed to deserialize json string into a valid object___{ex.Message}");
	}
}

// TEST Direct Shape BB
DirectShape new_shape_element = DirectShape.CreateElement(_document, new ElementId((int)BuiltInCategory.OST_CableTray));
Solid mepBbSolid = GetSolidFromBouindigBox(el.get_BoundingBox(null));
//  Solid mepBbSolidTransformed = SolidUtils.CreateTransformed(mepBbSolid, bb.Transform);
new_shape_element.SetShape(new List<GeometryObject>() { mepBbSolid });
new_shape_element.SetName("TEST");

static Solid GetSolidFromBouindigBox(BoundingBoxXYZ _boundingBoxXYZ)
{
	BoundingBoxXYZ bbox = _boundingBoxXYZ;

	XYZ pt0 = new XYZ(bbox.Min.X, bbox.Min.Y, bbox.Min.Z);
	XYZ pt1 = new XYZ(bbox.Max.X, bbox.Min.Y, bbox.Min.Z);
	XYZ pt2 = new XYZ(bbox.Max.X, bbox.Max.Y, bbox.Min.Z);
	XYZ pt3 = new XYZ(bbox.Min.X, bbox.Max.Y, bbox.Min.Z);

	Line edge0 = Line.CreateBound(pt0, pt1);
	Line edge1 = Line.CreateBound(pt1, pt2);
	Line edge2 = Line.CreateBound(pt2, pt3);
	Line edge3 = Line.CreateBound(pt3, pt0);

	// Create loop, still in BBox coords

	List<Curve> edges = new List<Curve>();
	edges.Add(edge0);
	edges.Add(edge1);
	edges.Add(edge2);
	edges.Add(edge3);

	double height = bbox.Max.Z - bbox.Min.Z;

	CurveLoop baseLoop = CurveLoop.Create(edges);

	List<CurveLoop> loopList = new List<CurveLoop>();
	loopList.Add(baseLoop);

	Solid preTransformBox = GeometryCreationUtilities
	  .CreateExtrusionGeometry(loopList, XYZ.BasisZ,
		height);

	return preTransformBox;
}