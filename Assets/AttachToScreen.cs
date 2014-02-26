using UnityEngine;
using System.Collections;

public class AttachToScreen : MonoBehaviour {

	// Use this for initialization
	void Update () {
		transform.position = Camera.main.ScreenToViewportPoint (Input.mousePosition);
	}
}
