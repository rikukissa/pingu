using UnityEngine;
using System.Collections;

public class PlayerController : MonoBehaviour {
	
	public float maxSpeed = 5f;
	public float moveForce = 365f;
	public float jumpForce = 1000f;

	Animator animator;
	private bool jump = false;
	private bool grounded = false;
	private Transform groundCheck;

	// Use this for initialization
	void Start () {
		animator = transform.GetComponentInChildren<Animator> ();
		groundCheck = transform.Find("groundCheck");
	}
	
	// Update is called once per frame
	void Update () {
		grounded = Physics2D.Linecast(transform.position, groundCheck.position, 1 << LayerMask.NameToLayer("Ground"));

		if (!grounded) {
			animator.SetTrigger("PlayerFlying");
		}

		if (Input.GetButtonDown ("Jump") && grounded) {
			jump = true;
		}

		if (Mathf.Abs(rigidbody2D.velocity.x) > 0) {
			animator.SetTrigger("PlayerWalking");
		}

		// Flip player according to direction
		Vector3 scale = transform.localScale;
		scale.x = Mathf.Sign (Input.GetAxis("Horizontal"));
		transform.localScale = scale;

	
		
	}

	void FixedUpdate () {

		float h = Input.GetAxis("Horizontal");

		if (h * rigidbody2D.velocity.x < maxSpeed) {
			rigidbody2D.AddForce(Vector2.right * h * moveForce);
		}

		if (Mathf.Abs (rigidbody2D.velocity.x) > maxSpeed) {
			rigidbody2D.velocity = new Vector2(Mathf.Sign(rigidbody2D.velocity.x) * maxSpeed, rigidbody2D.velocity.y);
		}

		if(jump) {
			rigidbody2D.AddForce(new Vector2(0f, jumpForce));
			jump = false;
		}
	}

	public void BounceUp() {
		rigidbody2D.velocity = new Vector2(rigidbody2D.velocity.x, rigidbody2D.velocity.y * -1);
	}

	void OnTriggerEnter2D(Collider2D collider) {
		if (collider.tag == "EnemyKillBox") {
			collider.transform.parent.GetComponent<EnemyController>().Die();
			BounceUp ();
		}
		
	}
}
