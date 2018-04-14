const deltaT = 1
const frictionCoef = 0.99999


class Body {
  constructor (weight, x, y, vX, vY){
    this.weight=weight
    this.x=x
    this.y=y
    this.vX=vX
    this.vY=vY
  }
  applyForce (force) {
		let [fx,fy] = [force.x,force.y]
		this.vX=this.vX+fx*deltaT/this.weight
    this.vY=this.vY+fy*deltaT/this.weight
    this.x=this.x+this.vX*deltaT*deltaT
    this.y=this.y+this.vY*deltaT*deltaT
  }
	fluidFriction(factor){
		this.vX=this.vX*factor
		this.vY=this.vY*factor
    // this.vY=this.vY*factor
	}
	correct(){}

	draw(r = 255 ,g = 0, b = 0){
		fill(r,g,b)
		ellipse(this.x,this.y,5,5)

	}
	iterates(r = 255 ,g = 0, b = 0){
		this.correct()
		this.draw(r,g,b)
	}

}



class Pendule extends Body{
  constructor (weight, x, y, vX, vY, penduleLength, cntrX, cntrY){
    super (weight, x, y, vX, vY)
    this.penduleLength = penduleLength
    this.cntrX = cntrX
    this.cntrY = cntrY
  }
  penduleGravityForce() {
		let [weight, x, y, vX, vY, penduleLength, cntrX, cntrY] = [this.weight, this.x, this.y, this.vX, this.vY, this.penduleLength, this.cntrX, this.cntrY]
    let distCentr = this.distncefromCentr() //la distance au centre dans le plan
    let penduleBalanceAngle = Math.asin(distCentr/penduleLength)
		let penduleForceRadiale = Math.cos(penduleBalanceAngle)*Math.sin(penduleBalanceAngle)*weight // la résultatne des forces c'est du sin(angle)*gravité et la projection de ces forces sur le plan c'est cos(angle)*resultante
		let penduleAngleAroundCentre = this.angleFromCentr()
		return {
			'x': penduleForceRadiale*Math.cos(penduleAngleAroundCentre),
			'y':  penduleForceRadiale*Math.sin(penduleAngleAroundCentre)
		}

  }
	distncefromCentr(){
		let sideOfPendule = this.x>this.cntrX?-1:1

		return Math.sqrt(Math.pow(this.cntrX-this.x,2)+ Math.pow(this.cntrY-this.y,2))*sideOfPendule
	}
	angleFromCentr(){
		return Math.atan((this.cntrY-this.y)/(this.cntrX-this.x))
	}
	correct(){
		let distCentr = this.distncefromCentr()
		super.correct()
		if (distCentr > this.penduleLength) {
			this.vX=-this.vX //on inverse la vitesse
			this.vY=-this.vY
			let newDistCentr = this.penduleLength - (distCentr - this.penduleLength)
			let penduleAngleAroundCentre = this.angleFromCentr()
			this.x = this.cntrX + newDistCentr*Math.cos(penduleAngleAroundCentre)
			this.y = this.cntrY + newDistCentr*Math.sin(penduleAngleAroundCentre)
			this.correct()//des fois que le pendule aie fait plus d'un tour
		}
	}
	iterates(r = 255 ,g = 0, b = 0){
		this.draw(100,100,100)
		this.applyForce(this.penduleGravityForce())
		this.fluidFriction(frictionCoef)
		super.iterates(r,g,b)
	}
}




function setup() {
  createCanvas(1000, 1000);
	pendule = new Pendule(10,100,500,1,5,700,500,500)
	// penduleX = new Pendule(10,300,400,1,1,200,400,400)
	// penduleY = new Pendule(10,400,500,0,0,200,400,400)
	fill(0)
	ellipse(400, 400, 5, 5)
}

function draw() {
  if (mouseIsPressed) {
alert('test')
	  // fill(0);
  // } else {
    // fill(255);
  }
	// background(200);

	fill(0)
	// ellipse(400, 400, 5, 5)

	// penduleY.iterates(255,100,10)
	// penduleX.iterates(20,100,255)
	pendule.iterates(20,100,255)
	// alert('test')


}
